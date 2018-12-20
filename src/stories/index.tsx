import React from 'react';

import { storiesOf } from '@storybook/react';

import { wInfo } from '../utils';
import tableClosed from './images/table-closed.png';
import tableOpen from './images/table-open.png';
import sidebarOne from './images/sidebar-1.png';
import sidebarTwo from './images/sidebar-2.png';
import modal from './images/modal.png';

storiesOf('Task Description', module)
  .add(
    'Background',
    wInfo(`
    Hello! Standard Bots looking for an experienced React developer to work on our single page application.
    This is recurring work. We are just a couple months away from beginning deployments (the project
    we're hiring for does not need to be completed before we begin deployments), and we have
    about 3-5 months of work lined up with plenty more on the way. We're looking for a freelancer who
    can help structure our application using best practices quickly and according to both what we
    specify as requirements as well as what we need as a company.

    ----

    Our SPA has a handful of fairly complex pages with many more designed already. At the moment,
    we're a very small company, and only one person (Ben) has been managing the front end as well as
    about 5 other projects, so we're looking to offload the front end to a more experienced developer.

    ----

    At the moment, the front end is built using React and \`styled-components\` using ~ES2018 with
    occasional Flow for the tricky parts. We have a very tight integration with several strange backends
    including one GraphQL backend and one highly custom connection over WebRTC, so we expect types and testing
    will be crtiical to the success and maintainability of the platform to avoid breaking when we change
    the backends and to coordinate changes across projects.

    ----

    Additionally, flexibility is an important goal of ours, as we will have many clients with a
    large variety of needs, and we'd like the tools we build today to be useful for all clients as well
    as our own in-house tools.

    ----

    We'll always do our best to make our needs clear, but our ideal freelancer is a rational and clear
    thinker who doesn't need everything specified in excruciating detail. While we will occasionally
    need additioanl dev ops work, this project should be a fairly good indication of the kind of
    detail you can expect us to give on our future work together.

    ----

    The person writing this is Ben Berman (ben@standardbots.com). I've been managing this application
    myself, so you can expect me to be the only person you need to contact for now. If you have any
    questions, do not hesitate to ask me. I'm a human and I fully recognize that you are too, so please
    treat me with respect and it will always be returned. I work every day, and I will almost certainly
    respond on weekends and holidays as well. My ideal form of communication is text rather than phone
    calls, so e-mail or communication through Upwork is the best way to reach me.
  `)(() => null),
  )
  .add(
    'General Requirements',
    wInfo(`
    Our target platform is relatively simple -- we only need to support Chromebooks with a resolution
    of 2400x1600. However, ideally, our code can be written relatively cleanly so that we can resize
    our target as needed. We will *never* need to support mobile, and we can always make larger
    screens support smaller screens.

    ----

    ### Code Requirements

    * Everything must be written using TypeScript
    * All styling should be done through \`styled-components\`
      * Open for discussion if you have a strong opinion, but whatever you'd like must be
        easily themable on the client-side.
      * Please no bootstrap, Material, etc. It's more of a headache than it's worth, in my opinion
    * Everything must pass a basic eslint config such as the one at the root of this directory
      * There's some leniency here, and please feel free to add as many rules as you'd like
    * Everything must be run through Prettier with these options:
      * \`prettier --single-quote --trailing-comma all\`
    * Prop Types are nice but unnecessary, while TypeScript typing is mandatory
      * If a prop has runtime requirements (like a number from 0-100), it would be best to also
        have a Prop Type
    * Any libraries pulled in from npm should be very popular and well-documented
    * Use \`yarn\` rather than \`npm\`
    * Obviously, the project you're looking at is a storybook project. Please follow the "templates"
      given in \`Button\` and \`ButtonJS\` to make new components for \`Table\` and \`Modal\`, as well
      as \`Sidebar\` if it's not too obnoxious
      * Ideally, please include knobs using \`@storybook/addon-knobs\` to play with various attributes
        and the theme
    * You must use Git and be familiar with GitHub. For this task, you can submit it via zipfiles, but
      in the future we will be using GitHub for code sharing and minor communication such as pull
      requests

    ### Better than not

    * At the moment, we have no testing whatsoever. For these components, I'm not sure how much testing
      is even possible, much less beneficial. However, we'd love to see some testing using your favorite
      testing framework. (I like Jest, but I really don't care much)
    * Accessibility is not a huge concern of ours at the moment, but these components are pretty easy
      to make accessible, so following the typical a11y tests would be great as well. We do value
      accessibility and try to follow these rules as much as possible, but we are working on a timeline,
      so right now we're just trying to get basic functionality through
    * I'm not the best React developer in the world, so the opinions I share are always up for discussion
    * Pixel perfect accuracy is requested, but we won't be measuring with a ruler

    ### Other information

    * Any icons you need, feel free to grab from a random icon pack for now
  `)(() => null),
  )
  .add(
    'Table',
    wInfo(`
    Many of our screens share many UI components. Right now, we're not comfortable sharing all of these
    screens with you, but one screen essentially fulfills many roles, and that's the table screen.

    ----

    The table screen is a glorified wrapper around just one table. It's fairly self-explanatory.

    The following are requirements for the table:

    * Only make the table in the image, not the nav bar
    * The props should be relatively simple to understand
    * The table needs to have infinite scroll, and this should be accomplished through both lazy loading
      and lazy rendering
      * Please specify how you'd like pagination to be done. An example might be a prop called \`fetchPage\`
        which takes the number already rendered or something
      * We're using GraphQL for the backend of most of these tables, so that should inform the way
        the data is served if you know GraphQL. Any advice you have here would also be very welcome.
    * Sorting by column should be supported via a prop similar to lazy loading
    * The dropdown arrow on the left should be functional, and offer a way to specify how to render the
      child component, but you can just leave it as a placeholder for now
    * Don't worry about the filter action for now, but ideally the group actions should be customizable
  `)(() => (
      <div>
        <h3 style={{ color: 'red' }}>
          Description and requirements below images
        </h3>
        <img src={tableClosed} alt="Table with a couple of things checked" />
        <img src={tableOpen} alt="Table with Group Actions action open" />
      </div>
    )),
  )
  .add(
    'Simple Modal',
    wInfo(`
    Modals are common throughout our application. This is an example of a relatively simple one with just
    a message and buttons.

    ### Requirements:

    * The content should be specified either using \`props.children\` or something equally easy to use
      * Don't worry too much about the content itself, as it will typically be immediately hardcoded
        by the user
    * The buttons must be themable and ghostable
      * You can see \`ButtonJS\` for an example of what I mean.
    * The number of buttons must be variable
      * e.g. we may need to put in a "Cancel" and "Save" button, each with different themes
    * The size of the modal must be changable either with an enumeration (small, medium, or large) or with
      a height and width
    `)(() => (
      <div>
        <h3 style={{ color: 'red' }}>
          Description and requirements below images
        </h3>
        <img src={modal} alt="Modal" />
      </div>
    )),
  )
  .add(
    'Sidebar',
    wInfo(`
    The sidebar is on every one of our screens. It's really self-explanatory, so I won't go too
    far into detail.

    ### Requirements:

    * Should be customizable -- the menu items should be props, not hardcoded
    * As you can see, some first tier items have second tiers, while some don't, as indicated by
      the arrows on the right of the first tier
    * Please make it apparent that the background will be visible through the fog
    * CSS animation to slide out from the left
      * Use whatever parameters you think look nice; not judging you on your design ability, but
        we don't have designs for this right now and it's not mission critical
    * Only two layers of nesting are necessary, but three would be great in case the designs do change

    ### Notes:

    * I haven't tried implementing something like this in Storybook, so it might be hard/impossible.
      Feel free to set up another page or project that showcases the component appropriately. Just
      make sure it's easy for me to set up and access.
    `)(() => (
      <div>
        <h3 style={{ color: 'red' }}>
          Description and requirements below images
        </h3>
        <img src={sidebarOne} alt="Sidebar with only one tier open" />
        <br />
        <img src={sidebarTwo} alt="Sidebar with both tiers open" />
      </div>
    )),
  );
