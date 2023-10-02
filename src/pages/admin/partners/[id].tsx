import { Box, Breadcrumbs, Button, Divider, Grid, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { AuthedComponent } from "~/components/AuthedComponent"
import { api } from "~/utils/api"
import Link from 'next/link'
import { ModalBox } from "~/components/ui/ModalBox"
import ButtonActivator from "~/components/ui/ButtonActivator"
import dayjs from 'dayjs'
import { useForm } from "react-hook-form"
import { Attention } from "@prisma/client"

export default AuthedComponent(function Partner() {
    const router = useRouter()
    const partner = api.partners.partnerShow.useQuery({ id: router.query.id as string })
    const removePartner = api.partners.removePartner.useMutation()
    const attentions = api.attentions.userAttentions.useQuery({ id: router.query.id as string })
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/admin/partners">
                    Pagina de socios
                </Link>
                <Typography color="text.primary">
                    {partner.isFetched ? `${partner.data!.name} ${partner.data!.surname}` : router.query.id}
                </Typography>
            </Breadcrumbs>
            <Divider sx={{ margin: '10px 0px' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant={'h4'}>{partner.data?.name} {partner.data?.surname}</Typography>
                <ButtonActivator Activator={() => (<Button color="error" variant="contained">Eliminar socio</Button>)}>
                    {(onClose) => (
                        <ModalBox modalTitle="¿Estas seguro que quieres eliminar este socio?" onClose={onClose}>
                            <Button variant={'contained'} color={'error'} onClick={async () => {
                                await removePartner.mutateAsync({ id: router.query.id as string })
                                onClose()
                                router.push('/admin/partners')
                            }}>
                                Confirmar
                            </Button>
                        </ModalBox>
                    )}
                </ButtonActivator>
            </Box>

            <TableContainer>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Correo electrónico</TableCell>
                        <TableCell>{partner.data?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Telefono</TableCell>
                        <TableCell>{partner.data?.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Fecha de nacimiento</TableCell>
                        <TableCell>{partner.isFetched && dayjs(partner.data?.bornDate).format('DD/MM/YYYY')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>SIP</TableCell>
                        <TableCell>{partner.data?.sipcard}</TableCell>
                    </TableRow>
                </TableBody>
            </TableContainer>

            <Divider />

            <Typography>Listado de atenciones ({(attentions.data || []).length})</Typography>
            <AddAttentionButton />
        </>
    )
})

function AddAttentionButton() {
    return <ButtonActivator Activator={() => (<Button variant="contained">Añadir atención</Button>)}>
        {(onClose) => (
            <ModalBox onClose={onClose} modalTitle="Añadir atención">
                <AttentionForm onSubmit={(a: Attention) => {
                    console.log('On submit')
                }} />
            </ModalBox>
        )}
    </ButtonActivator>
}

function AttentionForm({onSubmit}) {
    const {register, handleSubmit} = useForm<Attention>()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
                <Grid xs={12} item>
                    <TextField {...register('note')} fullWidth label="Comentario" />
                </Grid>
                <Grid xs={12} flexDirection={'row'} item display={'flex'} justifyContent={'flex-end'}>
                    <Button type={'submit'}>Guardar</Button>
                </Grid>
            </Grid>
        </form>
    )
}

