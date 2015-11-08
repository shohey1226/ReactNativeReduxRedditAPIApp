import React, {ScrollView, Text, PropTypes, PickerIOS} from 'react-native';
import { connect } from 'react-redux/native'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'
import Posts from '../components/Posts'
var Button = require('react-native-button');

var {
  AppRegistry,
  StyleSheet,
  View,
} = React;

var AsyncApp = React.createClass({

  componentDidMount() {
    const { dispatch, selectedReddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedReddit))
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  },

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit))
  },

  handleRefreshClick() {
    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  },

  render: function() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props

    return (
      <ScrollView contentContainerStyle={styles.container}>

        <PickerIOS
          style={{ width: 200,  marginTop: 100 }}
          selectedValue={selectedReddit}
          onValueChange={this.handleChange}
        >
          {[ 'reactjs', 'frontend'].map((reddit) => (
            <PickerIOS.Item
              key={reddit}
              value={reddit}
              label={reddit}
            />
            )
          )}
        </PickerIOS>

        {lastUpdated &&
          <Text style={{color: 'blue'}}>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
          </Text>
        }
        <Button onPress={this.handleRefreshClick}>
          Refresh
        </Button>

        {isFetching && posts.length === 0 &&
          <Text>Loading...</Text>
        }
        {!isFetching && posts.length === 0 &&
          <Text>Empty.</Text>
        }
        {posts.length > 0 &&
          <View style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </View>
        }
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
});

AsyncApp.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}


function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
