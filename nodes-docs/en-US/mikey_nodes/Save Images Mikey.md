---
tags:
- Image
- ImageSave
---

# Save Images Mikey (Mikey)
## Documentation
- Class name: `Save Images Mikey`
- Category: `Mikey/Image`
- Output node: `True`

This node is designed to facilitate the saving of images to disk, incorporating additional functionalities such as prefixing filenames and appending extra information to PNG files. It abstracts the complexities involved in file handling and metadata management, aiming to streamline the process of persisting images with contextual data.
## Input types
### Required
- **`images`**
    - The collection of images to be saved. This parameter is central to the node's operation, determining the primary content that will be persisted to disk.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`sub_directory`**
    - Specifies the sub-directory within the output folder where the images will be saved, aiding in the organization of saved files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_text_i`**
    - The part of the dynamic filename construction, contributing to a customizable naming scheme. This parameter allows for multiple filename texts to be specified, enhancing the flexibility in naming saved images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_separator`**
    - A separator character or string used between different parts of the filename to ensure readability and structure.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`timestamp`**
    - Indicates whether a timestamp should be included in the filename, providing a time-based identifier for the saved image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`counter_type`**
    - Defines the type of counter to be used in the filename, aiding in the creation of unique filenames for each saved image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`filename_text_i_pos`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`timestamp_pos`**
    - The position in the filename where the timestamp should be inserted, if applicable, to incorporate time-based identifiers.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`timestamp_type`**
    - Specifies the format of the timestamp to be included in the filename, ensuring consistency in time-based identifiers.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`counter_pos`**
    - The position in the filename where the counter should be inserted, facilitating the generation of unique filenames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`extra_metadata`**
    - Additional metadata that can be included with the image, enhancing the documentation and traceability of the saved file.
    - Comfy dtype: `STRING`
    - Python dtype: `Optional[Dict[str, str]]`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveImagesMikeyML:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"

    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"images": ("IMAGE", ),
                     'sub_directory': ("STRING", {'default': ''}),
                     "filename_text_1": ("STRING", {'default': 'Filename Text 1'}),
                     "filename_text_2": ("STRING", {'default': 'Filename Text 2'}),
                     "filename_text_3": ("STRING", {'default': 'Filename Text 3'}),
                     "filename_separator": ("STRING", {'default': '_'}),
                     "timestamp": (["true", "false"], {'default': 'true'}),
                     "counter_type": (["none", "folder", "filename"], {'default': 'folder'}),
                     "filename_text_1_pos": ("INT", {'default': 0}),
                     "filename_text_2_pos": ("INT", {'default': 2}),
                     "filename_text_3_pos": ("INT", {'default': 4}),
                     "timestamp_pos": ("INT", {'default': 1}),
                     "timestamp_type": (['job','save_time'], {'default': 'save_time'}),
                     "counter_pos": ("INT", {'default': 3}),
                     "extra_metadata": ("STRING", {'default': 'Extra Metadata'}),},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    RETURN_TYPES = ()
    FUNCTION = "save_images"
    OUTPUT_NODE = True
    CATEGORY = "Mikey/Image"

    def _prepare_filename_texts(self, filename_text_1, filename_text_2, filename_text_3, extra_pnginfo, prompt):
        # replace default values with empty strings
        filename_texts = [filename_text_1, filename_text_2, filename_text_3]
        default_texts = ['Filename Text 1', 'Filename Text 2', 'Filename Text 3']
        for i, text in enumerate(filename_texts):
            if text == default_texts[i]:
                filename_texts[i] = ''
            # use search and replace
            filename_texts[i] = search_and_replace(text, extra_pnginfo, prompt)
            # replace any special characters with nothing
            #filename_texts[i] = re.sub(r'[^a-zA-Z0-9 _-]', '', filename_texts[i])
            # replace only characters that are not allowed in filenames
            filename_texts[i] = re.sub(r'[<>:"/\\|?*]', '', filename_texts[i])
            # remove non ascii characters
            filename_texts[i] = filename_texts[i].encode('ascii', 'ignore').decode('ascii')

        # need to make sure the total filelength name is under 256 characters including the .png, separator, and counter
        # if the total length is over 256 characters, truncate the longest text to fit under 250 characters total length
        total_length = len(filename_texts[0]) + len(filename_texts[1]) + len(filename_texts[2]) + 5 + 5 + 12
        if total_length > 120:
            longest_text = max(filename_texts, key=len)
            longest_text_idx = filename_texts.index(longest_text)
            text_length_without_longest = total_length - len(longest_text)
            filename_texts[longest_text_idx] = longest_text[0:120 - text_length_without_longest]
        return filename_texts

    def _get_initial_counter(self, files, full_output_folder, counter_type, filename_separator, counter_pos, filename_texts):
        counter = 1
        if counter_type == "folder":
            if files:
                for f in files:
                    if filename_separator in f:
                        try:
                            counter = max(counter, int(f.split(filename_separator)[counter_pos]) + 1)
                        except:
                            counter = 1
                            break
            else:
                counter = 1
        elif counter_type == "filename":
            for f in files:
                f_split = f.split(filename_separator)
                # strip .png from strings
                f_split = [x.replace('.png', '') for x in f_split]
                matched_texts = all(
                    filename_texts[i] == f_split[i] for i in range(3) if filename_texts[i]
                )
                if matched_texts:
                    counter += 1
        return counter

    def _get_next_counter(self, full_output_folder, filename_base, counter):
        """Checks for the next available counter value."""
        while True:
            current_filename = filename_base.format(counter=f"{counter:05}")
            if not os.path.exists(os.path.join(full_output_folder, f"{current_filename}.png")):
                return counter
            counter += 1

    def save_images(self, images, sub_directory, filename_text_1, filename_text_2, filename_text_3,
                    filename_separator, timestamp, counter_type,
                    filename_text_1_pos, filename_text_2_pos, filename_text_3_pos,
                    timestamp_pos, timestamp_type, counter_pos, extra_metadata,
                    prompt=None, extra_pnginfo=None):
        positions = [filename_text_1_pos, filename_text_2_pos, filename_text_3_pos, timestamp_pos, counter_pos]
        if len(positions) != len(set(positions)):
            raise ValueError("Duplicate position numbers detected. Please ensure all position numbers are unique.")
        sub_directory = search_and_replace(sub_directory, extra_pnginfo, prompt)
        # strip special characters from sub_directory
        #sub_directory = re.sub(r'[^a-zA-Z0-9 _/\\]', '', sub_directory)
        # replace only characters that are not allowed in filenames
        sub_directory = re.sub(r'[<>:"|?*]', '', sub_directory)
        # remove non ascii characters
        sub_directory = sub_directory.encode('ascii', 'ignore').decode('ascii')
        full_output_folder = os.path.join(self.output_dir, sub_directory)
        os.makedirs(full_output_folder, exist_ok=True)

        filename_texts = self._prepare_filename_texts(filename_text_1, filename_text_2, filename_text_3, extra_pnginfo, prompt)

        if timestamp == 'true':
            ts = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        else:
            ts = ''

        elements = {
            filename_text_1_pos: filename_texts[0],
            filename_text_2_pos: filename_texts[1],
            filename_text_3_pos: filename_texts[2],
            timestamp_pos: ts,
            counter_pos: 'counter' if counter_type != 'none' else None
        }

        # Construct initial filename without the counter
        sorted_elements = [elem for _, elem in sorted(elements.items()) if elem]
        filename_base = filename_separator.join(sorted_elements).replace('counter', '{counter}')

        # Get initial counter value
        files = os.listdir(full_output_folder)
        if counter_type != 'none':
            counter = self._get_initial_counter(files, full_output_folder, counter_type, filename_separator, counter_pos, filename_texts)
        else:
            counter = 0

        results = list()
        for ix, image in enumerate(images):
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = PngInfo()
            if prompt is not None:
                metadata.add_text("prompt", json.dumps(prompt))
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    if x == 'parameters':
                        # encode text as utf-8
                        text = extra_pnginfo[x].encode('utf-8').decode('utf-8')
                        metadata.add_text(x, text)
                    elif x == 'workflow':
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                    elif x == 'prompt':
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                    else:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x], ensure_ascii=False))
            if extra_metadata:
                #metadata.add_text("extra_metadata", json.dumps(extra_metadata, ensure_ascii=False))
                metadata.add_text("extra_metadata", extra_metadata)
            # Check and get the next available counter
            if counter_type != 'none':
                counter = self._get_next_counter(full_output_folder, filename_base, counter)
                current_filename = filename_base.format(counter=f"{counter:05}")
            else:
                current_filename = filename_base
            if timestamp_type == 'save_time' and timestamp == 'true':
                current_timestamp = datetime.datetime.now().strftime("%y%m%d%H%M%S")
                current_filename = current_filename.replace(ts, current_timestamp)
                ts = current_timestamp
            if ix > 0 and counter_type == 'none':
                current_filename = current_filename.replace(ts, ts + f'_{ix:02}')
            img.save(os.path.join(full_output_folder, f"{current_filename}.png"), pnginfo=metadata, compress_level=4)
            results.append({
                "filename": f"{current_filename}.png",
                "subfolder": sub_directory,
                "type": self.type
            })
            if counter_type != 'none':
                counter += 1

        return {"ui": {"images": results}}

```
