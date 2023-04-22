import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const exportFile = async (data, fileName) => {
    try {
        const stringifiedData = JSON.stringify(data);
        const filePath = FileSystem.documentDirectory + fileName;
        await FileSystem.writeAsStringAsync(filePath, stringifiedData, { encoding: FileSystem.EncodingType.UTF8 });

        const isAvailable = await Sharing.isAvailableAsync();

        if (!isAvailable) {
            console.log('Export unavailable on this platform');
            throw new Error('Export unavailable on this platform');
        }

        await Sharing.shareAsync(filePath);
        return { success: true };
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};
