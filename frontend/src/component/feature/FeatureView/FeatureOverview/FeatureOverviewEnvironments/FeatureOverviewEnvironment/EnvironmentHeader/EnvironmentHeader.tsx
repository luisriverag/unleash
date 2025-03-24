import type { FC, PropsWithChildren } from 'react';
import {
    AccordionSummary,
    type AccordionSummaryProps,
    styled,
} from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Truncator } from 'component/common/Truncator/Truncator';
import { useId } from 'hooks/useId';

const StyledAccordionSummary = styled(AccordionSummary, {
    shouldForwardProp: (prop) => prop !== 'expandable',
})<{
    expandable?: boolean;
}>(({ theme, expandable }) => ({
    boxShadow: 'none',
    padding: theme.spacing(0.5, 3, 0.5, 2),
    display: 'flex',
    alignItems: 'center',
    '&&&': {
        cursor: expandable ? 'pointer' : 'default',
    },
}));

const StyledHeader = styled('header')(({ theme }) => ({
    display: 'flex',
    columnGap: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: '100%',
    color: theme.palette.text.primary,
    alignItems: 'center',
    minHeight: theme.spacing(8),
    containerType: 'inline-size',
}));

const StyledHeaderTitle = styled('hgroup')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    flexDirection: 'column',
    flex: 1,
    columnGap: theme.spacing(1),
    '@container (max-width: 500px)': {
        gridTemplateColumns: '1fr',
    },
}));

const StyledHeaderTitleLabel = styled('p')(({ theme }) => ({
    fontSize: theme.fontSizes.smallerBody,
    color: theme.palette.text.secondary,
    gridColumn: '1/-1',
}));

const StyledTruncator = styled(Truncator)(({ theme }) => ({
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
}));

const StyledStrategyCount = styled('p')(({ theme }) => ({
    fontSize: theme.fontSizes.smallerBody,
    color: theme.palette.info.contrastText,
    backgroundColor: theme.palette.info.light,
    whiteSpace: 'nowrap',
    width: 'min-content',
    borderRadius: theme.shape.borderRadiusExtraLarge,
    padding: theme.spacing(0.5, 1),
}));

const NeutralStrategyCount = styled(StyledStrategyCount)(({ theme }) => ({
    fontSize: theme.fontSizes.smallerBody,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.neutral.light,
}));

type EnvironmentMetadata = {
    strategyCount: number;
    releasePlanCount: number;
};

type EnvironmentHeaderProps = {
    environmentId: string;
    expandable?: boolean;
    environmentMetadata?: EnvironmentMetadata;
} & AccordionSummaryProps;

const MetadataChip = ({
    strategyCount,
    releasePlanCount,
}: EnvironmentMetadata) => {
    if (strategyCount === 0 && releasePlanCount === 0) {
        return <NeutralStrategyCount>0 strategies added</NeutralStrategyCount>;
    }

    const releasePlanText = releasePlanCount > 0 ? 'Release plan' : undefined;

    const strategyText = () => {
        switch (strategyCount) {
            case 0:
                return undefined;
            case 1:
                return `1 strategy`;
            default:
                return `${strategyCount} strategies`;
        }
    };

    const text = `${[releasePlanText, strategyText()].filter(Boolean).join(', ')} added`;

    return <StyledStrategyCount>{text}</StyledStrategyCount>;
};

export const EnvironmentHeader: FC<
    PropsWithChildren<EnvironmentHeaderProps>
> = ({
    environmentId,
    children,
    expandable = true,
    environmentMetadata,
    ...props
}) => {
    const id = useId();
    return (
        <StyledAccordionSummary
            {...props}
            expandIcon={
                <ExpandMore
                    sx={{ visibility: expandable ? 'visible' : 'hidden' }}
                />
            }
            id={id}
            aria-controls={`environment-accordion-${id}-content`}
            expandable={expandable}
        >
            <StyledHeader data-loading>
                <StyledHeaderTitle>
                    <StyledHeaderTitleLabel>Environment</StyledHeaderTitleLabel>
                    <StyledTruncator component='h2'>
                        {environmentId}
                    </StyledTruncator>
                    {environmentMetadata ? (
                        <MetadataChip {...environmentMetadata} />
                    ) : null}
                </StyledHeaderTitle>
                {children}
            </StyledHeader>
        </StyledAccordionSummary>
    );
};
