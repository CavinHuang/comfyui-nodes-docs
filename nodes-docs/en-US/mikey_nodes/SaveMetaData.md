---
tags:
- Image
- Metadata
---

# SaveMetaData (Mikey)
## Documentation
- Class name: `SaveMetaData`
- Category: `Mikey/Meta`
- Output node: `True`

The SaveMetaData node is designed to save metadata information to a text file. It processes image metadata and additional information, such as prompts and extra PNG info, to generate a comprehensive metadata file that encapsulates various details about the image and its associated data.
## Input types
### Required
- **`image`**
    - The image whose metadata is to be saved. This parameter is crucial as it determines the context and content of the metadata to be saved.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`filename_prefix`**
    - A prefix for the filename under which the metadata will be saved. This allows for customizable naming conventions for the metadata files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`timestamp_prefix`**
    - A boolean flag indicating whether to prepend a timestamp to the filename, aiding in organizing and sorting the metadata files.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`counter`**
    - A boolean flag that determines whether a counter should be appended to the filename, useful for versioning or tracking multiple metadata files for the same image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveMetaData:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {'image': ('IMAGE',),
                             'filename_prefix': ("STRING", {"default": ""}),
                             'timestamp_prefix': (['true','false'], {'default':'true'}),
                             'counter': (['true','false'], {'default':'true'}),},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},}

    RETURN_TYPES = ()
    FUNCTION = "save_metadata"
    CATEGORY = "Mikey/Meta"
    OUTPUT_NODE = True

    def save_metadata(self, image, filename_prefix, timestamp_prefix, counter, prompt=None, extra_pnginfo=None):
        # save metatdata to txt file
        filename_prefix = search_and_replace(filename_prefix, extra_pnginfo, prompt)
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, folder_paths.get_output_directory(), 1, 1)
        ts_str = datetime.datetime.now().strftime("%y%m%d%H%M")
        filen = ''
        if timestamp_prefix == 'true':
            filen += ts_str + '_'
        filen = filen + filename_prefix
        if counter == 'true':
            filen += '_' + str(counter)
        filename = filen + '.txt'
        file_path = os.path.join(full_output_folder, filename)
        with open(file_path, 'w') as file:
            for key, value in extra_pnginfo.items():
                file.write(f'{key}: {value}\n')
            for key, value in prompt.items():
                file.write(f'{key}: {value}\n')
        return {'save_metadata': {'filename': filename, 'subfolder': subfolder}}

```
