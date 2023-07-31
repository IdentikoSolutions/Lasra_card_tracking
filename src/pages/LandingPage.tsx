import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { FlexCol, FlexRow, Overlay, Video } from '../styles/styles'
import cardsstack from '../images/cardsstack.webp';

// import  lotus from '../assets/lotus.mp4';
import styled from 'styled-components';
import { Iimg } from '../interface/interface';
import { color } from '../artifacts/colors';
const lotus = require('../assets/lotus.mp4');
const Img = styled(Overlay)<Iimg>`
  position: relative;
  width: 800px;
  height: 600px;
`
const ColFlex = styled(FlexCol)`
  align-content: flex-start;
  justify-content: flex-start;
  // align-items:flex-start;
  align-self: start;
  width:50%;
  padding:2rem;
  background:linear-gradient(to top, transparent, #02390b);
   h2 {
    color: ${({ color }) => `${color}`};
  };
  p {
    color: ${({ color }) => `${color}`};
  }
`
export function LandingPage() {
  return (
    <Carousel axis="horizontal" autoPlay interval={4000} infiniteLoop>
      <FlexRow>
        <ColFlex color={'white'}>
          <h2>Welcome</h2>
          <p>
            Welcome to Lasrra card tracking portal. This portal will give you
            seemless control and tracking your cards.
            debitis consectetur aliquam magni quod, laboriosam culpa sit, doloribus
        sapiente deleniti provident. Et corporis explicabo excepturi voluptatem
        eos at animi! Vitae accusamus nisi quo, saepe eaque consectetur atque
        modi, Obcaecati dolorum quae harum temporibus quo eum Debitis quas eius
        labore rerum eos. Corporis quo expedita praesentium fuga qui dolor quasi
        error quibusdam dolorem debitis consectetur aliquam magni quod,
        laboriosam culpa sit, doloribus sapiente deleniti provident. Et corporis
        explicabo excepturi voluptatem eos at animi! Vitae accusamus nisi quo,
        saepe eaque consectetur atque modi, expedita quos dolores autem
        excepturi.
          </p>
        </ColFlex>

        <Img img={cardsstack}></Img>
      </FlexRow>
      <FlexRow>
        <ColFlex color={'white'}>
          <h2>Welcome</h2>
          <p>
            Welcome to Lasrra card tracking portal. This portal will give you
            seemless control and tracking your cards.
            debitis consectetur aliquam magni quod, laboriosam culpa sit, doloribus
        sapiente deleniti provident. Et corporis explicabo excepturi voluptatem
        eos at animi! Vitae accusamus nisi quo, saepe eaque consectetur atque
        modi, Obcaecati dolorum quae harum temporibus quo eum Debitis quas eius
        labore rerum eos. Corporis quo expedita praesentium fuga qui dolor quasi
        error quibusdam dolorem debitis consectetur aliquam magni quod,
        laboriosam culpa sit, doloribus sapiente deleniti provident. Et corporis
        explicabo excepturi voluptatem eos at animi! Vitae accusamus nisi quo,
        saepe eaque consectetur atque modi, expedita quos dolores autem
        excepturi.
          </p>
        </ColFlex>

        <Img img={''}>
            <Video src={lotus} autoPlay loop muted />
        </Img>
      </FlexRow>
      <FlexRow>
        <ColFlex color={'white'}>
          <h2>Welcome</h2>
          <p>
            Welcome to Lasrra card tracking portal. This portal will give you
            seemless control and tracking your cards.
            debitis consectetur aliquam magni quod, laboriosam culpa sit, doloribus
        sapiente deleniti provident. Et corporis explicabo excepturi voluptatem
        eos at animi! Vitae accusamus nisi quo, saepe eaque consectetur atque
        modi, Obcaecati dolorum quae harum temporibus quo eum Debitis quas eius
        labore rerum eos. Corporis quo expedita praesentium fuga qui dolor quasi
        error quibusdam dolorem debitis consectetur aliquam magni quod,
        laboriosam culpa sit, doloribus sapiente deleniti provident. Et corporis
        explicabo excepturi voluptatem eos at animi! Vitae accusamus nisi quo,
        saepe eaque consectetur atque modi, expedita quos dolores autem
        excepturi.
          </p>
        </ColFlex>

        <Img img={cardsstack}></Img>
      </FlexRow>
      <FlexRow>
        <ColFlex color={'white'}>
          <h2>Welcome</h2>
          <p>
            Welcome to Lasrra card tracking portal. This portal will give you
            seemless control and tracking your cards.
            debitis consectetur aliquam magni quod, laboriosam culpa sit, doloribus
        sapiente deleniti provident. Et corporis explicabo excepturi voluptatem
        eos at animi! Vitae accusamus nisi quo, saepe eaque consectetur atque
        modi, Obcaecati dolorum quae harum temporibus quo eum Debitis quas eius
        labore rerum eos. Corporis quo expedita praesentium fuga qui dolor quasi
        error quibusdam dolorem debitis consectetur aliquam magni quod,
        laboriosam culpa sit, doloribus sapiente deleniti provident. Et corporis
        explicabo excepturi voluptatem eos at animi! Vitae accusamus nisi quo,
        saepe eaque consectetur atque modi, expedita quos dolores autem
        excepturi.
          </p>
        </ColFlex>

        <Img img={cardsstack}></Img>
      </FlexRow>
      <h2>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum,
        incidunt. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Quidem perspiciatis facere eos, deserunt nobis iste fuga beatae
        aspernatur. Eveniet explicabo ut exercitationem voluptas odio distinctio
        rerum cumque sunt tempora, recusandae consequatur dolore eaque possimus
        est ipsum eos ullam porro quasi corrupti ad. Obcaecati dolorum quae
        harum temporibus quo eum Debitis quas eius labore rerum eos. Corporis
        quo expedita praesentium fuga qui dolor quasi error quibusdam dolorem
        debitis consectetur aliquam magni quod, laboriosam culpa sit, doloribus
        sapiente deleniti provident. Et corporis explicabo excepturi voluptatem
        eos at animi! Vitae accusamus nisi quo, saepe eaque consectetur atque
        modi, Obcaecati dolorum quae harum temporibus quo eum Debitis quas eius
        labore rerum eos. Corporis quo expedita praesentium fuga qui dolor quasi
        error quibusdam dolorem debitis consectetur aliquam magni quod,
        laboriosam culpa sit, doloribus sapiente deleniti provident. Et corporis
        explicabo excepturi voluptatem eos at animi! Vitae accusamus nisi quo,
        saepe eaque consectetur atque modi, expedita quos dolores autem
        excepturi.
      </h2>
      <h2>Tuesday</h2>
      <h2>wednesday</h2>
    </Carousel>
  )
}
