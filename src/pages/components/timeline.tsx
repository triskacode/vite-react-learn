import { Baby, GraduationCap } from 'lucide-react';
import { Timeline, TimelineGroup } from '@/components/timeline';

export default function Page(): JSX.Element {
  return (
    <div className="prose relative max-w-full py-6 dark:prose-invert lg:pl-6">
      <h1 className="mb-0">Timeline.</h1>
      <p className="mt-2">This is timeline component page.</p>
      <TimelineGroup className="ms-4">
        <Timeline
          title="Hello World"
          date={new Date('2002-05-12')}
          icon={<Baby className="h-5 w-5" />}
        >
          <p>
            On this day, I entered the world, marking the beginning of my life's
            journey. It was a moment of joy and celebration for my family as
            they welcomed their newest member. This event set the stage for all
            the experiences, growth, and adventures that would follow in the
            years to come.
          </p>
        </Timeline>
        <Timeline
          title="Graduate from High School"
          date={new Date('2019-06-13')}
          icon={<GraduationCap className="h-5 w-5" />}
        >
          <p>
            Successfully completed high school education, achieving academic
            excellence and personal growth. Participated in various
            extracurricular activities, developed leadership skills, and formed
            lasting friendships. Ready to embark on the next chapter of life
            with a solid foundation of knowledge and experiences.
          </p>
        </Timeline>
      </TimelineGroup>
    </div>
  );
}
