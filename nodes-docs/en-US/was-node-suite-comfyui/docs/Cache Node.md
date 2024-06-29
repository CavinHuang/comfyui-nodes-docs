---
tags:
- Cache
---

# Cache Node
## Documentation
- Class name: `Cache Node`
- Category: `WAS Suite/IO`
- Output node: `True`

The Cache Node is designed to manage the caching process within a workflow, specifically handling the loading and saving of various types of data such as latent representations, images, and conditioning information. It facilitates efficient data retrieval and storage, optimizing the workflow's performance by reducing redundant computations and data loading times.
## Input types
### Required
- **`latent_suffix`**
    - Specifies the suffix for the latent data cache file. It is crucial for identifying and retrieving precomputed latent representations, enhancing efficiency by avoiding redundant computations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`image_suffix`**
    - Indicates the suffix for the image data cache file. This parameter is essential for identifying and accessing pre-stored images, streamlining the workflow by eliminating the need for repeated image loading.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`conditioning_suffix`**
    - Defines the suffix for the conditioning data cache file. It plays a key role in identifying and fetching precomputed conditioning information, thereby speeding up the data preparation process for model inputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`output_path`**
    - Specifies the directory path where the cache files are stored or will be stored. This parameter is essential for directing where to save or load cache files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`latent`**
    - The latent representation data to be cached. This parameter is optional and is used when saving data to the cache.
    - Comfy dtype: `LATENT`
    - Python dtype: `Optional[torch.Tensor]`
- **`image`**
    - The image data to be cached. This parameter is optional and is used when saving data to the cache.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`conditioning`**
    - The conditioning information to be cached. This parameter is optional and is used when saving data to the cache.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`latent_filename`**
    - Comfy dtype: `STRING`
    - The filename of the latent representation data cache file.
    - Python dtype: `str`
- **`image_filename`**
    - Comfy dtype: `STRING`
    - The filename of the image data cache file.
    - Python dtype: `str`
- **`conditioning_filename`**
    - Comfy dtype: `STRING`
    - The filename of the conditioning data cache file.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Cache:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent_suffix": ("STRING", {"default": str(random.randint(999999, 99999999))+"_cache", "multiline":False}),
                "image_suffix": ("STRING", {"default": str(random.randint(999999, 99999999))+"_cache", "multiline":False}),
                "conditioning_suffix": ("STRING", {"default": str(random.randint(999999, 99999999))+"_cache", "multiline":False}),
            },
            "optional": {
                "output_path": ("STRING", {"default": os.path.join(WAS_SUITE_ROOT, 'cache'), "multiline": False}),
                "latent": ("LATENT",),
                "image": ("IMAGE",),
                "conditioning": ("CONDITIONING",),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,TEXT_TYPE,TEXT_TYPE)
    RETURN_NAMES = ("latent_filename","image_filename","conditioning_filename")
    FUNCTION = "cache_input"
    OUTPUT_NODE = True

    CATEGORY = "WAS Suite/IO"

    def cache_input(self, latent_suffix="_cache", image_suffix="_cache", conditioning_suffix="_cache", output_path=None, latent=None, image=None, conditioning=None):

        if 'joblib' not in packages():
            install_package('joblib')

        import joblib

        output = os.path.join(WAS_SUITE_ROOT, 'cache')
        if output_path:
            if output_path.strip() not in ['', 'none', 'None']:
                output = output_path
        if not os.path.isabs(output):
            output = os.path.abspath(output)
        if not os.path.exists(output):
            os.makedirs(output, exist_ok=True)

        l_filename = ""
        i_filename = ""
        c_filename = ""

        tokens = TextTokens()
        output = tokens.parseTokens(output)

        if latent != None:
            l_filename = f'{tokens.parseTokens(latent_suffix)}.latent'
            out_file = os.path.join(output, l_filename)
            joblib.dump(latent, out_file)
            cstr(f"Latent saved to: {out_file}").msg.print()

        if image != None:
            i_filename = f'{tokens.parseTokens(image_suffix)}.image'
            out_file = os.path.join(output, i_filename)
            joblib.dump(image, out_file)
            cstr(f"Tensor batch saved to: {out_file}").msg.print()

        if conditioning != None:
            c_filename = f'{tokens.parseTokens(conditioning_suffix)}.conditioning'
            out_file = os.path.join(output, c_filename)
            joblib.dump(conditioning, os.path.join(output, out_file))
            cstr(f"Conditioning saved to: {out_file}").msg.print()

        return (l_filename, i_filename, c_filename)

```
