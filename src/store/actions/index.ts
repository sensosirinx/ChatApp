import * as ChatActions from './chat'
import * as TokenActions from './token'
import * as WidgetActions from './widget'


export default {
  ...ChatActions,
  ...TokenActions,
  ...WidgetActions
}
