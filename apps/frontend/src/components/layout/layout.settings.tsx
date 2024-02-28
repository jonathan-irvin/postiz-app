import { ReactNode } from 'react';
import { Title } from '@gitroom/frontend/components/layout/title';
import { headers } from 'next/headers';
import { ContextWrapper } from '@gitroom/frontend/components/layout/user.context';
import { TopMenu } from '@gitroom/frontend/components/layout/top.menu';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { ToolTip } from '@gitroom/frontend/components/layout/top.tip';
import { ShowMediaBoxModal } from '@gitroom/frontend/components/media/media.component';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const NotificationComponent = dynamic(
  () =>
    import('@gitroom/frontend/components/notifications/notification.component'),
  {
    loading: () => <></>,
    ssr: false,
  }
);

export const LayoutSettings = ({ children }: { children: ReactNode }) => {
  const user = JSON.parse(headers().get('user')!);
  return (
    <ContextWrapper user={user}>
      <MantineWrapper>
        <ToolTip />
        <ShowMediaBoxModal />
        <div className="min-h-[100vh] w-full max-w-[1440px] mx-auto bg-primary px-[12px] text-white flex flex-col">
          <div className="px-[23px] flex h-[80px] items-center justify-between z-[200] sticky top-0 bg-primary">
            <div className="text-2xl flex items-center gap-[10px]">
              <div>
                <Image src="/logo.svg" width={55} height={53} alt="Logo" />
              </div>
              <div className="mt-[12px]">Gitroom</div>
            </div>
            <TopMenu />
            <div>
              <NotificationComponent />
            </div>
          </div>
          <div className="flex-1 flex">
            <div className="flex-1 rounded-3xl px-[23px] py-[17px] flex flex-col">
              <Title />
              <div className="flex flex-1 flex-col">{children}</div>
            </div>
          </div>
        </div>
      </MantineWrapper>
    </ContextWrapper>
  );
};
