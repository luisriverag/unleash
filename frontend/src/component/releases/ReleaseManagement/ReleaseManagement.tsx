import { PageContent } from 'component/common/PageContent/PageContent';
import { Grid } from '@mui/material';
import { styles as themeStyles } from 'component/common';
import { usePageTitle } from 'hooks/usePageTitle';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import Add from '@mui/icons-material/Add';
import ResponsiveButton from 'component/common/ResponsiveButton/ResponsiveButton';
import { useNavigate } from 'react-router-dom';
import { useReleasePlanTemplates } from 'hooks/api/getters/useReleasePlanTemplates/useReleasePlanTemplates';
import { EmptyTemplatesListMessage } from './EmptyTemplatesListMessage';
import { ReleasePlanTemplateList } from './ReleasePlanTemplateList';
import { useUiFlag } from 'hooks/useUiFlag';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { PremiumFeature } from 'component/common/PremiumFeature/PremiumFeature';
import { RELEASE_PLAN_TEMPLATE_CREATE } from '@server/types/permissions';

export const ReleaseManagement = () => {
    usePageTitle('Release templates');
    const navigate = useNavigate();
    const data = useReleasePlanTemplates();

    const { isEnterprise } = useUiConfig();
    const releasePlansEnabled = useUiFlag('releasePlans');
    if (!releasePlansEnabled) {
        return null;
    }

    if (!isEnterprise()) {
        return <PremiumFeature feature='releaseManagement' page />;
    }

    return (
        <>
            <PageContent
                header={
                    <PageHeader
                        title={`Release templates`}
                        actions={
                            <ResponsiveButton
                                Icon={Add}
                                onClick={() => {
                                    navigate(
                                        '/release-templates/create-template',
                                    );
                                }}
                                maxWidth='700px'
                                permission={RELEASE_PLAN_TEMPLATE_CREATE}
                                disabled={!isEnterprise()}
                            >
                                New template
                            </ResponsiveButton>
                        }
                    />
                }
            >
                {data.templates.length > 0 && (
                    <Grid container spacing={2}>
                        <ReleasePlanTemplateList templates={data.templates} />
                    </Grid>
                )}
                {data.templates.length === 0 && (
                    <div className={themeStyles.fullwidth}>
                        <EmptyTemplatesListMessage />
                    </div>
                )}
            </PageContent>
        </>
    );
};
