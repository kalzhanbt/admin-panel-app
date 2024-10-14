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

import { Dialog, InputController, SelectController } from "@/shared/ui";
import { MainTable } from '@/features/MainTable';
import { TabsWithNavigation } from '@/widgets/TabsWithNavigation';

import { MainPageRoot, TableCellContentWrapper } from "./TruckDriversPage.styles";

import {
    useGetTrucksQuery,
    useGetTruckDriversQuery,
    useCreateTruckDriverMutation,
    useDeleteTruckDriverMutation,
    useUpdateTruckDriverMutation
} from '@/shared/api'
import { TTruckDriver } from "@/shared/types";

import EditIcon from "@/assets/icons/Edit.icon.svg?react";
import CloseIcon from "@/assets/icons/Close.icon.svg?react";

const TruckDriversPage = () => {
    const [chosenItem, setChosenItem] = useState<TTruck>()
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(true);

    const defaultValue = {
        name: "",
        surname: "",
        phoneNumber: "",
        assignedTruckId: ""
    };

    const { data: truckDriversList = [], refetch, isLoading: isTruckDriversLoading, isFetching: isTruckDriversFetching } = useGetTruckDriversQuery();
    const { data: trucksList = [], isLoading: isTruckLoading, isFetching: isTrucksFetching } = useGetTrucksQuery();
    const [createTruck, { isLoading: isCreateLoading }] = useCreateTruckDriverMutation();
    const [updateTruck, { isLoading: isUpdateLoading }] = useUpdateTruckDriverMutation();
    const [deleteTruck, { isLoading: isDeleteLoading }] = useDeleteTruckDriverMutation();

    const {
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
        control
    } = useForm<TTruckDriver>({ defaultValues: defaultValue });

    const onSubmit: SubmitHandler<TTruckDriver> = (data) => {
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

    const handleOpenDeleteDialog = (item: TTruckDriver) => {
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
            key: 'name',
            label:
                <TableCellContentWrapper> Name
                </TableCellContentWrapper>,
        },
        {
            key: 'surname',
            label:
                <TableCellContentWrapper> Surname
                </TableCellContentWrapper>,
        },
        {
            key: 'phoneNumber',
            label:
                <TableCellContentWrapper> Phone Number
                </TableCellContentWrapper>,
        },
        {
            key: 'assignedTruckId',
            label:
                <TableCellContentWrapper> Assigned Truck
                </TableCellContentWrapper>,
            getArgs: (args: TTruckDriver) => (trucksList.find(item => args.assignedTruckId === item._id)["registeredPlate"]),
        },
        {
            key: 'action',
            label: 'Действия',
            getArgs: (args: TTruckDriver) => (
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

    const options = [...trucksList.map((i: any) => ({label: i.registeredPlate, value: i._id}))];

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
                    <MainTable tableHeaderData={tableHeaderData} tableData={truckDriversList} isDataLoading={isTruckDriversLoading || isTruckDriversFetching} />
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
                            placeholder='Name'
                            inputControl={control}
                            error={errors?.name}
                            inputName='name'
                            rules={{
                                required: "Name is required",
                            }}
                        />
                        <InputController
                            type='text'
                            placeholder='Surname'
                            inputControl={control}
                            error={errors?.surname}
                            inputName='surname'
                            rules={{
                                required: "Surname is required",
                            }}
                        />
                        <InputController
                            type='text'
                            placeholder='Phone Number'
                            inputControl={control}
                            error={errors?.phoneNumber}
                            inputName='phoneNumber'
                            rules={{
                                required: "Phone Number is required",
                            }}
                        />
                        <SelectController
                            inputName="assignedTruckId"
                            inputControl={control}
                            options={options}
                            placeholder="Choose an truck"
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

export default TruckDriversPage;