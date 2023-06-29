import React , {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import axios from "axios";

const Blog = () =>{    
    const [posts, setPosts] = useState();

    useEffect(() => {       
        if(!posts){
            axios.get("http://192.168.1.97:8080/api/blog/readPost").then((value) => {
              setPosts(value.data.data);
            });
          }
    },[]);

    return (
        <ScrollView>
        <View style={styles.container}>
            {posts && posts.map((post) => (
                <View style={styles.postCard} key={post._id}>
                        <Text style={{color:'black', fontWeight:'bold',fontSize:20, marginTop:20}}>
                            {post.theme}
                        </Text>
                        <Image
                            style={styles.imagePost}
                            source={{ url: post.image }}/>
                        <Text style={{fontWeight:'bold', marginBottom:30}}>
                            {post.title}
                        </Text>
                        <Text style={{color:'black', fontSize:12, textAlign:'center'}}>
                            {post.body}
                        </Text>
                        <Text style={{fontStyle:'italic', marginTop:20}}>
                            Créé par {post.author}
                        </Text>
                        <Text style={{marginTop:20}}>
                            Le {new Date(post.createdAt).toLocaleDateString('fr')}
                        </Text>
                </View>
            ))}
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor :'white', flex:1, alignItems:'center',
    },
    postCard:{
        marginTop:20,
        width: 350,
        height: 750,
        borderRadius:30,
        backgroundColor: 'rgb(230,230,230)',
        alignItems: 'center',        
    },
    imagePost:{
        marginTop:20,
        marginBottom:20,
        width:'100%',
        height:'30%'
    }
});

export default Blog;