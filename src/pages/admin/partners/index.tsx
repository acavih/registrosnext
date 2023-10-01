import { Grid, Typography, Button, Breadcrumbs, Divider } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { AuthedComponent } from "~/components/AuthedComponent"
import ButtonActivator from "~/components/ui/ButtonActivator"
import { ModalBox } from "../../../components/ui/ModalBox"
import { PartnerForm } from "../../../components/partners/PartnerForm"
import { api } from "~/utils/api"
import { Partner } from "@prisma/client"

/**
 * <Breadcrumbs aria-label="breadcrumb">
    <Link underline="hover" color="inherit" href="/">
        MUI
    </Link>
    <Link
        underline="hover"
        color="inherit"
        href="/material-ui/getting-started/installation/"
    >
        Core
    </Link>
    <Typography color="text.primary">Breadcrumbs</Typography>
</Breadcrumbs>
 */

export default AuthedComponent(function PartnersPage() {
    const partners = api.partners.partnersList.useQuery()
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">Página de socios</Typography>
            </Breadcrumbs>
            <Divider sx={{margin: '10px 0px'}} />
            <Grid container gap={1}>
                <Grid xs={12} item display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h5">Listado de socios</Typography>
                    <ButtonAddPartner onAdd={() => partners.refetch()} />
                </Grid>
                <Grid xs={12} item>
                    {partners.isFetched && <PartnersTable partners={partners.data} />}
                </Grid>
            </Grid>
        </>
    )
})

function ButtonAddPartner({onAdd}) {
    const addPartner = api.partners.createPartner.useMutation()
    return (
        <ButtonActivator Activator={() => (<Button variant={'contained'}>Añadir socio</Button>)}>
            {(onClose) => (
                <ModalBox onClose={onClose}>
                    <PartnerForm onSubmit={async (values) => {
                        console.log('añadiendo socio', values)
                        const partnerCreated = await addPartner.mutateAsync(values as any)
                        console.log(partnerCreated)
                        onAdd()
                        onClose()
                    }} />
                </ModalBox>
            )}
        </ButtonActivator>
    )
}

function PartnersTable({partners}) {
    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Nombre'},
        {field: 'surname', headerName: 'Apellidos'},
        {field: 'actions', headerName: 'Acciones', renderCell: (params) => (
            <Button variant="contained" size="small">Ver</Button>
        )},
    ]
    return (
        <DataGrid rows={partners} autoHeight={true} columns={columns} />
    )
}
