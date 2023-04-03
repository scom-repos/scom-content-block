import {Styles} from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

Styles.cssRule('i-scom-content-block', {
  paddingLeft: '3.75%',
  paddingRight: '3.75%',

  $nest: {
    '.content-block-wrapper': {
      position: 'relative',
      width: '100%',
    },

    '.content-block-empty': {
      minHeight: '325px',
      backgroundColor: 'rgba(0,0,0,.03)',
      outline: '2px dashed rgba(0,0,0,.1)',

      $nest: {
        '.content-block-add-btn': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          color: 'rgb(32,33,36)',
          gap: 0,
          transition: 'all .28s cubic-bezier(.4,0,.2,1)',
          boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)',
          zIndex: 10,

          $nest: {
            '&:hover': {
              backgroundColor: 'hsl(217.4157303371,100%,83.5245901639%)',
              boxShadow: '0 2px 3px 0 rgba(60,64,67,.3), 0 6px 10px 4px rgba(60,64,67,.15)',

              $nest: {
                'i-icon': {
                  fill: 'rgb(66,133,244)!important',
                },
              },
            },

            'i-icon': {
              width: 14,
              height: 14,
            },
          },
        },
      },
    },
  },
});
