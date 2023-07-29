# bedrock-tools-generator

What is it? Bedrock tools generator is a tool used for easy creation of tools for Minecraft bedrock edition add-ons.
Generation is based on blocks.json file, blocks are sorted by their sounds. Note that you update exclude/add data by hand. To do it, edit the `sounds_data.json` file in `data` folder.

# How to use

Run the script and type options. You can put custom blocks.json file into `custom_data` folder. Result will be written in output.txt file.
Note: when creating pickaxe you need to remove some blocks, like obsidian by hand if you don't want your pickaxe mine it.

# Data update

Sometimes you'll need to update blocks.json file which is used by this script. It is located in `vanilla_data` folder. After that you'll need to run the script and choose 'add new sounds' in data options. When you update the data via options in script, you mostly generate new lists with data. If you made a mistake, don't worry. Usually there is a `backup_sounds_data.json` with previous settings. You can download vanilla resource pack [here](https://aka.ms/resourcepacktemplate).
