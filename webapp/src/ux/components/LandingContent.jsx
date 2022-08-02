import React from 'react';

import AppContext from '../utils/context' ;
import AccountCarousel from './AccountCarousel';
import Like from "./like/Like";
import styled from 'styled-components';

class LandingContent extends React.Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      translateAction: 150,
      translateCarousel: -150
    }
  }

  setTranslation = () => {
    this.setState({translateAction:0, translateCarousel:0})
  }

  componentDidMount() {
    setTimeout(this.setTranslation, 0)
  }

  pages = {
    like: {title:"Like a web page", component:<Like />}
  }
  
  render = () => {

    let translateMap = {
      'like': {
        'translate':(this.context.action === 'like') ? 0: 200,
        'opacity':(this.context.action === 'like') ? 1: 0,
      },
      'buy': {
        'translate':(this.context.action === 'buy') ? 0: 200,
        'opacity':(this.context.action === 'buy') ? 1: 0,
      },
      'more': {
        'translate':(this.context.action === 'more') ? 0: 200,
        'opacity':(this.context.action === 'more') ? 1: 0,
      },
      'chat': {
        'translate':(this.context.action === 'chat') ? 0: 200,
        'opacity':(this.context.action === 'chat') ? 1: 0,
      },
    }

    return (
      <ContentContainer>
        <CarouselRow>
          <AccountCarousel translate={this.state.translateCarousel}/>
        </CarouselRow>
        <ActionContainer translate={this.state.translateAction}>
          <ActionPage translate={translateMap['like']['translate']} opacity={translateMap['like']['opacity']}>
            <Like/>
          </ActionPage>
          <ActionPage translate={translateMap['buy']['translate']} opacity={translateMap['buy']['opacity']}>
            <Buy/>
          </ActionPage>
          <ActionPage translate={translateMap['more']['translate']} opacity={translateMap['more']['opacity']}>
            <more/>
          </ActionPage>
          <ActionPage translate={translateMap['chat']['translate']} opacity={translateMap['chat']['opacity']}>
            <chat/>
          </ActionPage>
        </ActionContainer>
      </ContentContainer>
    ) ;
  }
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`
const CarouselRow = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  ${'' /* border: 2px solid red; */}
`
const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  ${'' /* border: 2px solid red; */}
  flex: 1;
  width: 90%;
  position: relative;
  z-index: 1;
  transform: translateY(${props => props.translate}%);
  transition: all 0.3s;
`
const ActionPage = styled.div`
  overflow: auto;
  transform: translateY(${props => props.translate}%);
  opacity: ${props => props.opacity};
  height: 100%;
  width: 100%;
  max-width: 650px;
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 30px 30px 0 0;
  display:flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  z-index: 0;
`
const Buy = styled.div``

export default LandingContent ;



