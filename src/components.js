'use strict'

import { Flex, Link, Box, Label, Card } from 'smbls'

export const Header = {
  extend: Flex,
  props: {
    minWidth: '100%',
    padding: 'Z B',
    align: 'center space-between'
  },

  Flex: {
    props: { gap: 'C' },
    childExtend: {
      extend: Link,
      props: ({ props }) => ({
        textDecoration: window.location.pathname === props.href ? 'underline' : 'none'
      })
    },
    Text_logo: { href: '/', text: 'Hello!' },
    Text_about: { href: '/about', text: 'About' }
  },

  ThemeSwitcher: {}
}

export const ThemeSwitcher = {
  extend: Flex,
  props: { gap: 'A2' },
  childExtend: {
    props: (element, state) => ({
      active: state.globalTheme === element.key,
      cursor: 'pointer',
      '.active': {
        fontWeight: '900'
      }
    }),
    on: {
      click: (event, element, state) => {
        state.update({ globalTheme: element.key })
      }
    }
  },
  dark: { text: 'Dark' },
  light: { text: 'Light' },
  midnight: { text: 'Midnight' }
}

export const Footer = {
  props: {
    padding: 'Z B',
    order: 9
  }
}

export const Block = {
  extend: Box,
  props: (element, state) => {
    const { x, y, initY, initX } = element.props;

    return {
      margin: '0.125em',
      borderRadius: '0.25em',
      background: state.x > x && state.y > y ? '#3d7bd9' : '#e8f1ff',
      width: `100%`,
      height: '100%',
      cursor: 'pointer',

      borderRadiusTopLeft: (x === 0 && y === 0),
      '.borderRadiusTopLeft': {
        borderRadius: '1em 0.25em 0.25em 0.25em',
      },

      borderRadiusBottomLeft: (x === 0 && y === initY - 1),
      '.borderRadiusBottomLeft': {
        borderRadius: '0.25em 0.25em 0.25em 1em',
      },

      borderRadiusTopRight: (x === initX - 1 && y === initY - 1),
      '.borderRadiusTopRight': {
        borderRadius: '0.25em 0.25em 1em 0.25em',
      },

      borderRadiusBottomRight: (x === initX - 1 && y === 0),
      '.borderRadiusBottomRight': {
        borderRadius: '0.25em 1em 0.25em 0.25em',
      },
    };
  },
  on: {
    click: (event, element, state) => {
      const { x, y } = element.props;

      if (x === state.x - 1 && y === state.y - 1) {
        state.update({
          selectedCount: 0,
          x: 0,
          y: 0,
        });
        return;
      }

      state.update({
        ...state,
        selectedCount: (x + 1) * (y + 1),
        x: x + 1,
        y: y + 1,
      });

    },
  },
};

export const ModalGridSelectionFooter = {
  extend: Flex,
  props: {
    padding: 'A',
    justifyContent: 'space-between',
    width: '100%',
  },
  Flex1: {
    extend: Flex,
    Label1: {
      extend: Label,
      text: (element, state) => state.x && state.y ? 'Selection coordinates: ' : '',
      props: {
        padding: '0 0.5em 0 0',
        textAlign: 'start',
        fontWeight: '400',
        fontSize: '0.75em',
        color: '#00000080',
      },
    },
    Label2: {
      extend: Label,
      text: '{{ x }}, {{ y }}',
      text: (element, state) => state.x && state.y ? `${state.x}, ${state.y}` : '',
      props: {
        padding: '0',
        textAlign: 'start',
        fontWeight: '400',
        fontSize: '0.75em',
        color: 'black',
        fontWeight: 'bold',
      },
    },
  },

  Flex2: {
    extend: Flex,
    Label1: {
      extend: Label,
      text: (element, state) => state.selectedCount ? 'Total cells selected: ' : '',
      props: {
        padding: '0 0.5em 0 0',
        textAlign: 'start',
        fontWeight: '400',
        fontSize: '0.75em',
        color: '#00000080',
      },
    },
    Label2: {
      extend: Label,
      text: (element, state) => state.selectedCount ? state.selectedCount : '',
      props: {
        padding: '0',
        textAlign: 'start',
        fontWeight: '400',
        fontSize: '0.75em',
        color: 'black',
        fontWeight: 'bold',
      },
    },
  }
}

export const ModalGridSelection = {
  Card: (element, state) => {
    const { initX, initY } = element.props;

    return {
      extend: Flex,
      props: {
        padding: '1em',
        gap: 'A',
        borderRadius: 'A',
        boxShadow: '0 4px 6px 2px #0000001a',
        background: 'white',
        align: 'start',
        justifyContent: 'space-around',
        flexDirection: 'column',
      },
      state: {
        dataCells: {
          selectedCount: 0,
          x: 0,
          y: 0,
        },
      },
      Flex: {
        props: {
          padding: 'A',
        },
        Title: {
          text: 'Grid Selection',
          color: '#000000',
          fontWeight: '700',
          fontSize: '14px',
        },
      },
      Grid: {
        extend: Flex,
        extend: 'Grid',
        props: {
          templateColumns: `repeat(${initX}, 1fr)`,
          templateRows: `repeat(${initY}, 1fr)`,
          gap: 'Z',
          width: '514px',
          height: '298px',
        },
        ...Array.from({ length: initX * initY }, (_, index) => {
          const x = index % initX;
          const y = Math.floor(index / initX);
          return {
            Block: {
              props: {
                key: `${y}-${x}`,
                x,
                y,
                initX,
                initY,
                'data-x': x,
                'data-y': y,
              },
            }
          };
        })

      },
      ModalGridSelectionFooter: {}
    }
  },
}