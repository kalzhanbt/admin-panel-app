import { StyledStack, StyledPagination } from "./Pagination.styles";
import { PaginationItem, PaginationProps } from "@mui/material";

import ArrowNextIcon from '@/assets/icons/ArrowNext.icon.svg?react';
import ArrowDoubleNextIcon from '@/assets/icons/ArrowDoubleNext.icon.svg?react';
import ArrowPreviousIcon from '@/assets/icons/ArrowPrevious.icon.svg?react';
import ArrowDoublePreviousIcon from '@/assets/icons/ArrowDoublePrevious.icon.svg?react';

const Pagination:React.FC<PaginationProps> = (props) => {
    return (
        <StyledStack spacing={2}>
            <StyledPagination
                count={10}
                variant="outlined"
                shape="rounded"
                showFirstButton
                showLastButton
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowPreviousIcon, next: ArrowNextIcon, first: ArrowDoublePreviousIcon, last: ArrowDoubleNextIcon }}
                        {...item}
                    />
                )}
                {...props}
            />
        </StyledStack>
    )
}

export default Pagination;