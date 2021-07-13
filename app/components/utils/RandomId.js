import AsyncStorage from '@react-native-async-storage/async-storage';

const charId = length => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const GenerateRandomId = async () => {
    try {
        let userId = await AsyncStorage.getItem('user');
        if (!userId) {
            let date = new Date();
            let sec = date.getSeconds();
            let min = date.getMinutes();
            let hour = date.getHours();
            let day = date.getDay();
            let month = date.getMonth();
            let year = date.getFullYear();

            userId = charId(2) + sec + min + hour + day + month + year + charId(3);
            await AsyncStorage.setItem('user', JSON.stringify({ id: userId, points: 0 }));
            return userId
        }
        return JSON.parse(userId);


    } catch (error) {
        console.log("Id generation error: ", error);
        alert("Id generation error");
    }

}

export default GenerateRandomId;