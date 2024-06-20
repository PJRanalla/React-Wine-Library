import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import { server_calls } from '../api/server';
import { useGetData } from '../custom-hooks/FetchData';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

function DataTable() {
    const [open, setOpen] = useState(false);
    const { wineData, getData } = useGetData();
    const [selectionModel, setSelectionModel] = useState<string[]>([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteData = async () => {
        try {
            await server_calls.delete(selectionModel[0]);
            getData();
            console.log(`Deleted item with id: ${selectionModel}`);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleCheckboxChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setSelectionModel((prev) =>
            checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id)
        );
    };

    return (
        <>
            <Modal id={selectionModel} open={open} onClose={handleClose} />
            <div className="container mx-auto my-5">
                <div className="flex flex-row p-4 space-x-3">
                    <div>
                        <Button
                            className="p-3 bg-slate-300 rounded hover:bg-slate-800 hover:text-white"
                            onClick={handleOpen}
                        >
                            Add New Wine
                        </Button>
                    </div>
                    <Button onClick={handleOpen} className="p-3 bg-slate-300 rounded hover:bg-slate-800 hover:text-white">
                        Update
                    </Button>
                    <Button onClick={deleteData} className="p-3 bg-slate-300 rounded hover:bg-slate-800 hover:text-white">
                        Delete
                    </Button>
                </div>

                <h2 className="p-3 bg-slate-300 my-2 rounded">My Wine Collection</h2>
                <ImageList sx={{ width: '100%', height: 'auto' }}>
                    {wineData.map((item) => (
                        <ImageListItem key={item.id} sx={{ maxWidth: 400, maxHeight: 600 }}>
                            <img
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                alt={item.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.name}
                                subtitle={
                                    <div>
                                        <span>Vintage: {item.vintage}</span>
                                        <p>Country: {item.country}</p>
                                        <p>Region: {item.region}</p>
                                        <p>Taste: {item.taste}</p>
                                        <p>Nose: {item.nose}</p>
                                        <p>Price: {item.price}</p>
                                    </div>
                                }
                                position="below"
                                actionIcon={
                                    <input
                                        type="checkbox"
                                        checked={selectionModel.includes(item.id)}
                                        onChange={handleCheckboxChange(item.id)}
                                    />
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </>
    );
}

export default DataTable;
