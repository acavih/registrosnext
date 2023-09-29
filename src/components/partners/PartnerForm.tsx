import { Grid, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export function PartnerForm({ onSubmit }: { onSubmit: (values: { name: string; surname: string; }) => void; }) {
    const { handleSubmit, register } = useForm<{
        name: string;
        surname: string;
    }>();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField {...register('name')} fullWidth label={'Nombre'} />
                </Grid>
                <Grid item xs={12}>
                    <TextField {...register('surname')} fullWidth label={'Apellidos'} />
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} flexDirection={'row'}>
                    <Button type={'submit'} variant={'contained'}>Guardar socio</Button>
                </Grid>
            </Grid>
        </form>
    );
}
