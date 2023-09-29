import { Grid, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";

export type Partner = {
    name: string;
    surname: string;
    bornDate: string;
}

export function PartnerForm({ onSubmit }: { onSubmit: (values: Partner) => void; }) {
    const { handleSubmit, register, setValue, formState } = useForm<Partner>();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField {...register('name')} fullWidth label={'Nombre'} />
                </Grid>
                <Grid item xs={12}>
                    <TextField {...register('surname')} fullWidth label={'Apellidos'} />
                </Grid>
                <Grid item xs={12}>
                    <DatePicker value={formState.dirtyFields.bornDate} onChange={(value: any) => {
                        setValue('bornDate', (value.toDate() as Date).toISOString())
                    }} label={'Fecha de nacimiento'} sx={{width: '100%'}} />
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} flexDirection={'row'}>
                    <Button type={'submit'} variant={'contained'}>Guardar socio</Button>
                </Grid>
            </Grid>
        </form>
    );
}
