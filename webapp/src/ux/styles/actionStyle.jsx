import styled from 'styled-components';


const ActionPage = styled.div`
  ${'' /* transform: translateY(${props => props.translate}%);
  opacity: ${props => props.opacity}; */}
  ${'' /* width: 100%; */}
  ${'' /* min_width: 300px;
  max-width: 600px; */}
  ${'' /* height: 90%; */}
  ${'' /* position: absolute; */}
  background: white;
  border-radius: 30px 30px 0 0;
  display:flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  z-index: 0;
`

export {
  ActionPage
}