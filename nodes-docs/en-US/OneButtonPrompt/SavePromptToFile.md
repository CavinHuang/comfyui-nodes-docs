# Save Prompt To File
## Documentation
- Class name: `SavePromptToFile`
- Category: `OneButtonPrompt`
- Output node: `True`

The SavePromptToFile node is designed to save various components of a prompt, including positive and negative aspects, into a text file. It handles the creation of a unique filename based on the prompt content or a provided prefix, ensuring the saved file is easily identifiable and organized within a specified directory.
## Input types
### Required
- **`filename_prefix`**
    - An optional prefix for the filename, allowing for custom organization or identification of the file within the output directory.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`positive_prompt`**
    - The main prompt text to be saved. It serves as the primary content for the file and influences the generation of the filename if no prefix is provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_prompt`**
    - The negative aspects of the prompt to be saved, providing a contrast or alternative perspective to the positive prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`prompt_g`**
    - An optional granular component of the prompt, saved additionally if provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prompt_l`**
    - Another optional granular component of the prompt, saved if present to add more context or detail.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`ui`**
    - Indicates the completion of the file saving process, returning a simple confirmation message.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SavePromptToFile:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"
        self.prefix_append = ""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "filename_prefix": ("STRING", {"default": "Prompt"}),
                "positive_prompt": ("STRING",{"multiline": True}),
                "negative_prompt": ("STRING",{"multiline": True}),
            },
            "optional": {
                "prompt_g": ("STRING",{"multiline": True}),
                "prompt_l": ("STRING",{"multiline": True}),
            },
        }

    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = "saveprompttofile"

    CATEGORY = "OneButtonPrompt"

    def saveprompttofile(self, positive_prompt, prompt_g, prompt_l, negative_prompt, filename_prefix):
        # Some stuff for the prefix
        filename_prefix += self.prefix_append

        # turns out there is some hardcoded stuff on saveimage we have to kind of repeat here
        # Find the %date:yyyy-M-d% pattern using regular expression
        pattern = r'%date:([^\%]+)%'
        match = re.search(pattern, filename_prefix)

        if match:
            # Extract the date format from the match
            date_format = match.group(1)

            # Get the current date
            current_date = datetime.now()

            # convert the ComfyUI standard into Python standard format.
            # What a crazy way of doing this
            # first lol, I got to make sure it doesn't overlap things
            date_format = date_format.replace('M', 'X')
            date_format = date_format.replace('m', 'Z')
            
            # This is so bad

            # lets make it even worse, it work differently on windows than in Linux
            if(platform.system() == 'Windows'):

                date_format = date_format.replace('yyyy', '%Y')
                date_format = date_format.replace('yy', '%#y')
                date_format = date_format.replace('X', '%#m')
                date_format = date_format.replace('d', '%#d')
                date_format = date_format.replace('h', '%#H')
                date_format = date_format.replace('Z', '%#M')
                date_format = date_format.replace('s', '%#S')
            else:
                date_format = date_format.replace('yyyy', '%Y')
                date_format = date_format.replace('yy', '%-y')
                date_format = date_format.replace('X', '%-m')
                date_format = date_format.replace('d', '%-d')
                date_format = date_format.replace('h', '%-H')
                date_format = date_format.replace('Z', '%-M')
                date_format = date_format.replace('s', '%-S')


            # Format the date using the extracted format
            formatted_date = current_date.strftime(date_format)

            # Replace the matched pattern with the formatted date
            filename_prefix = re.sub(pattern, formatted_date, filename_prefix)
            

           

        full_output_folder, filename_short, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir)

        # make the filename, from from a to the first comma
        # find the index of the first comma after "of a" or end of the prompt
        if(positive_prompt.find("of a ") != -1):
            start_index = positive_prompt.find("of a ") + len("of a ")
            end_index = positive_prompt.find(",", start_index)
            if(end_index == -1):
                end_index=len(positive_prompt)
        else:
            start_index = 0
            end_index = 128
  
        # extract the desired substring using slicing
        filename = positive_prompt[start_index:end_index]

        # cleanup some unsafe things in the filename
        filename = filename.replace("\"", "")
        filename = filename.replace("[", "")
        filename = filename.replace("|", "")
        filename = filename.replace("]", "")
        filename = filename.replace("<", "")
        filename = filename.replace(">", "")
        filename = filename.replace(":", "_")
        filename = filename.replace(".", "")
        filename = re.sub(r'[0-9]+', '', filename)

        safe_characters = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.")

        # Use regular expression to filter out any characters not in the whitelist
        filename = re.sub(r"[^{}]+".format(re.escape(''.join(safe_characters))), '', filename)
        

        if(filename==""):
            filename = str(uuid.uuid4())
        
        if(filename_prefix == ""):
        # create a datetime object for the current date and time
        # if there is no prefix
            now = datetime.now()
            filenamecomplete = now.strftime("%Y%m%d%H%M%S") + "_" + filename.replace(" ", "_").strip() + ".txt"
        
        else:
            # lol since we insert a file, the counter of the image goes up by 1.
            # So we add 1 here, so the prompt file matches the image file
            formatted_counter = str(counter + 1).zfill(5)
            filenamecomplete = filename_short + "_" + formatted_counter + "_" + filename.replace(" ", "_").strip() + ".txt"
    
        
        directoryandfilename = os.path.abspath(os.path.join(full_output_folder, filenamecomplete))
        

        with open(directoryandfilename, 'w', encoding="utf-8") as file:
            file.write("prompt: " + positive_prompt + "\n")
            
            if(len(prompt_g) > 0):
                file.write("prompt_g: " + prompt_g + "\n")
            if(len(prompt_l) > 0):
                file.write("prompt_l: " + prompt_l + "\n")
            
            file.write("negative prompt: " + negative_prompt + "\n")



        return ("done")

```
