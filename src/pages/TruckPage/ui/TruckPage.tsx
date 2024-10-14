import { useState } from "react";
import {
    Box,
    Stack,
    Container,
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";

import { useForm, SubmitHandler } from 'react-hook-form';

import { Dialog, InputController } from "@/shared/ui";
import { MainTable } from '@/features/MainTable';
import { TabsWithNavigation } from '@/widgets/TabsWithNavigation';

import { MainPageRoot, TableCellContentWrapper } from "./TruckPage.styles";

import {
    useGetTrucksQuery,
    useCreateTruckMutation,
    useDeleteTruckMutation,
    useUpdateTruckMutation
} from '@/shared/api'
import { TTruck } from "@/shared/types";

import EditIcon from "@/assets/icons/Edit.icon.svg?react";
import CloseIcon from "@/assets/icons/Close.icon.svg?react";

const TruckPage = () => {
    const [chosenItem, setChosenItem] = useState<TTruck>()
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(true);

    const defaultValue = {
        type: "",
        registeredPlate: "",
        VIN: ""
    };

    const { data: trucksList = [], refetch, isLoading: isTruckLoading, isFetching: isTrucksFetching } = useGetTrucksQuery();
    const [createTruck, { isLoading: isCreateLoading }] = useCreateTruckMutation();
    const [updateTruck, { isLoading: isUpdateLoading }] = useUpdateTruckMutation();
    const [deleteTruck, { isLoading: isDeleteLoading }] = useDeleteTruckMutation();

    const {
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
        control
    } = useForm<TTruck>({ defaultValues: defaultValue });

    const onSubmit: SubmitHandler<TTruck> = (data) => {
        if (isCreate) {
            createTruck({ ...data })
                .then(() => {
                    setIsEditOpen(false)
                    refetch()
                })
                .catch(() => setIsEditOpen(false))
        } else {
            if (chosenItem !== undefined) {
                updateTruck({
                    id: chosenItem.id,
                    body: { ...data }
                })
                    .then(() => {
                        setIsEditOpen(false)
                        refetch()
                    })
                    .catch(() => setIsEditOpen(false))
            }
        }
    }

    const handleOpenDeleteDialog = (item: TTruck) => {
        setIsDeleteOpen(true)
        setChosenItem(item)
    }

    const handleDeleteTruck = () => {
        if (chosenItem !== undefined) {
            deleteTruck(chosenItem._id)
                .then(() => {
                    setIsDeleteOpen(false);
                    refetch();
                })
                .catch(() => setIsDeleteOpen(false));
        }
    }

    const tableHeaderData = [
        {
            key: 'type',
            label:
                <TableCellContentWrapper> Type
                </TableCellContentWrapper>,
        },
        {
            key: 'registeredPlate',
            label:
                <TableCellContentWrapper> Registered Plate
                </TableCellContentWrapper>,
        },
        {
            key: 'VIN',
            label:
                <TableCellContentWrapper> VIN
                </TableCellContentWrapper>,
        },
        {
            key: 'action',
            label: 'Действия',
            getArgs: (args: TTruck) => (
                <Box
                    sx={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        justifyContent: "center",

                        svg: {
                            cursor: "pointer",
                        }
                    }}
                >
                    <EditIcon onClick={() => {
                        setIsEditOpen(true);
                        setIsCreate(false);
                        setChosenItem(args);
                        reset(args);
                    }} />

                    <CloseIcon onClick={() => handleOpenDeleteDialog(args)} />
                </Box>
            ),
            width: '100px'
        },
    ];

    return (
        <MainPageRoot>
            <Container maxWidth="xl">
                <TabsWithNavigation />

                <Box
                    sx={{
                        gap: '12px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '16px',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            variant='outlined'
                            onClick={() => {
                                setIsCreate(true);
                                setIsEditOpen(true);
                                reset(defaultValue);
                            }}
                        >
                            Создать
                        </Button>
                    </Box>
                    <MainTable tableHeaderData={tableHeaderData} tableData={trucksList} isDataLoading={isTruckLoading || isTrucksFetching} />
                </Box>
            </Container>

            <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
                <Stack spacing={4} alignItems={'center'}>
                    <Typography variant={'h4'} textAlign={'center'} maxWidth={320}>Are you sure to remove truck?</Typography>
                    <Box
                        sx={{
                            gap: '12px',
                            width: '100%',
                            display: 'flex',
                        }}
                    >
                        <Button fullWidth variant='outlined' onClick={() => setIsDeleteOpen(false)}>Back</Button>
                        <Button
                            fullWidth
                            variant='contained'
                            onClick={() => handleDeleteTruck()}
                            disabled={isDeleteLoading}
                        >
                            {isDeleteLoading ? <CircularProgress size={24} color='inherit' /> : "Yes"}
                        </Button>
                    </Box>
                </Stack>
            </Dialog>

            <Dialog
                open={isEditOpen}
                title={isCreate ? "Создать" : "Редактировать"}
                onClose={() => setIsEditOpen(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={1} mb={4} sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}>
                        <span style={{ fontSize: "14px", color: "rgba(17, 17, 20, 0.64)" }}>Название</span>
                        <InputController
                            type='text'
                            placeholder='Registered plate'
                            inputControl={control}
                            error={errors?.registeredPlate}
                            inputName='registeredPlate'
                            rules={{
                                required: "Registered plate is required",
                            }}
                        />
                        <InputController
                            type='text'
                            placeholder='Type'
                            inputControl={control}
                            error={errors?.type}
                            inputName='type'
                            rules={{
                                required: "Type is required",
                            }}
                        />
                        <InputController
                            type='text'
                            placeholder='VIN'
                            inputControl={control}
                            error={errors?.VIN}
                            inputName='VIN'
                            rules={{
                                required: "VIN is required",
                            }}
                        />
                    </Stack>
                    <Box
                        sx={{
                            gap: '12px',
                            display: 'flex',
                        }}
                    >
                        <Button fullWidth variant='outlined' onClick={() => setIsEditOpen(false)}>{"Отмена"}</Button>
                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            disabled={!isDirty || !isValid || isCreateLoading || isUpdateLoading}
                        >
                            {
                                isCreateLoading || isUpdateLoading
                                    ? <CircularProgress size={24} color='inherit' />
                                    : isCreate ? "Create" : "Edit"
                            }
                        </Button>
                    </Box>
                </form>
            </Dialog>
        </MainPageRoot >
    )
};

export default TruckPage;