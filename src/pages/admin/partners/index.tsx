import { Grid, Typography, Button, Breadcrumbs, Divider } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useState } from "react"
import { AuthedComponent } from "~/components/AuthedComponent"
import ButtonActivator from "~/components/ui/ButtonActivator"
import { ModalBox } from "../../../components/ui/ModalBox"
import { PartnerForm } from "../../../components/partners/PartnerForm"

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
    const [partners, setPartners] = useState([
        {id: 1, name: 'Juanjo', surname: 'De la cruz'}
    ])
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">Página de socios</Typography>
            </Breadcrumbs>
            <Divider sx={{margin: '10px 0px'}} />
            <Grid container gap={1}>
                <Grid xs={12} item display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h5">Listado de socios</Typography>
                    <ButtonAddPartner />
                </Grid>
                <Grid xs={12} item>
                    <PartnersTable partners={partners} />
                </Grid>
            </Grid>
        </>
    )
})

function ButtonAddPartner() {
    return (
        <ButtonActivator Activator={() => (<Button variant={'contained'}>Activar</Button>)}>
            {(onClose) => (
                <ModalBox onClose={onClose}>
                    <PartnerForm onSubmit={(values) => {
                        console.log('añadiendo socio', values)
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
        {field: 'actions', headerName: 'Acciones', align: 'right',  renderCell: (params) => (
            <Button variant="contained" size="small">Ver</Button>
        )},
    ]
    return (
        <DataGrid rows={partners} autoHeight={true} columns={columns}
            />
    )
}
