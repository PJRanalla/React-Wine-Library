import { useForm } from 'react-hook-form';
import { useDispatch, useStore } from 'react-redux';
import { chooseName, chooseCountry, chooseRegion, chooseVintage, chooseTaste, chooseNose, choosePrice, chooseImg } from '../redux/slices/RootSlice';
import { server_calls } from '../api/server';
import Button from './Button';
import Input from './Input';

interface WineFormProps {
    id?: string[];
    onClose: () => void;
}

const WineForm = (props: WineFormProps) => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const store = useStore();

    const onSubmit = async (data: any) => {
        try {
            if (props.id && props.id.length > 0) {
                await server_calls.update(props.id[0], data);
                console.log(`Updated: ${data.name} ${props.id}`);
            } else {
                dispatch(chooseName(data.name));
                dispatch(chooseCountry(data.country));
                dispatch(chooseRegion(data.region));
                dispatch(chooseVintage(data.vintage));
                dispatch(chooseTaste(data.taste));
                dispatch(chooseNose(data.nose));
                dispatch(choosePrice(data.price));
                dispatch(chooseImg(data.img)); // Dispatch the image URL

                await server_calls.create(store.getState());
                setTimeout(() => { window.location.reload(); }, 500);
                reset(); 
                props.onClose();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="name">Name</label>
                    <Input {...register('name')} name="name" placeholder="Name" />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <Input {...register('country')} name="country" placeholder="Country" />
                </div>
                <div>
                    <label htmlFor="region">Region</label>
                    <Input {...register('region')} name="region" placeholder="Region" />
                </div>
                <div>
                    <label htmlFor="vintage">Vintage</label>
                    <Input {...register('vintage')} name="vintage" placeholder="Vintage" />
                </div>
                <div>
                    <label htmlFor="taste">Taste</label>
                    <Input {...register('taste')} name="taste" placeholder="Taste" />
                </div>
                <div>
                    <label htmlFor="nose">Nose</label>
                    <Input {...register('nose')} name="nose" placeholder="Nose" />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder="Price" />
                </div>
                <div>
                    <label htmlFor="img">Image URL</label>
                    <Input {...register('img')} name="img" placeholder="Image URL" />
                </div>
                <div className="flex justify-end">
                    <Button className="bg-slate-300 p-2 rounded hover:bg-slate-800 text-white">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default WineForm;
