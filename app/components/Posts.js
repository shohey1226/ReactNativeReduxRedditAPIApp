import React, { View, Text, PropTypes, Component } from 'react-native'

export default class Posts extends Component {
  render() {
    return (
      <View>
        {this.props.posts.map((post, i) =>
          <Text key={i}>{post.title}</Text>
        )}
      </View>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
