import React , {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import {Link} from "@react-navigation/native";
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
                        <Link to={`/post/${post._id}`}>
                        <Text style={{color:'black', fontSize:20}}>{post.title}
                        </Text></Link>
                        <Image
                            style={styles.imagePost}
                            source={{ url: post.image }}/>
                        <Text style={{fontWeight:'bold', marginBottom:10}}>
                            {post.body}
                        </Text>
                        <Text style={{fontStyle:'italic'}}>
                            Créé par {post.author}
                        </Text>
                        <Text style={{marginTop:20}}>
                        <time>Le {new Date(post.createdAt).toLocaleDateString('fr')}</time>
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
        width: 300,
        height: 400,
        borderRadius:30,
        backgroundColor: 'rgb(230,230,230)',
        alignItems: 'center',
        justifyContent: 'center',         
    },
    imagePost:{
        marginTop:20,
        marginBottom:20,
        width:'100%',
        height:'50%'
    }
});

export default Blog;