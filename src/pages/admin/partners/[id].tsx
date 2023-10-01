import { Breadcrumbs, Button, Divider, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { AuthedComponent } from "~/components/AuthedComponent"
import { api } from "~/utils/api"
import Link from 'next/link'
import { ModalBox } from "~/components/ui/ModalBox"
import ButtonActivator from "~/components/ui/ButtonActivator"

export default AuthedComponent(function Partner () {
    const router = useRouter()
    const partner = api.partners.partnerShow.useQuery({id: router.query.id as string})
    const removePartner = api.partners.removePartner.useMutation()
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
            <Divider sx={{margin: '10px 0px'}} />
            <ButtonActivator Activator={() => (<Button color="error" variant="contained">Eliminar socio</Button>)}>
                {(onClose) => (
                    <ModalBox modalTitle="¿Estas seguro que quieres eliminar este socio?" onClose={onClose}>
                        <Button variant={'contained'} color={'error'} onClick={async () => {
                            await removePartner.mutateAsync({id: router.query.id as string})
                            onClose()
                            router.push('/admin/partners')
                        }}>
                            Confirmar
                        </Button>
                    </ModalBox>
                )}
            </ButtonActivator>
        </>
    )
})