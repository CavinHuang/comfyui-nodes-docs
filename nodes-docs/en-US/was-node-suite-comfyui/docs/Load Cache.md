---
tags:
- Cache
---

# Load Cache
## Documentation
- Class name: `Load Cache`
- Category: `WAS Suite/IO`
- Output node: `False`

The 'Load Cache' node is designed to load cached data from specified file paths. It supports loading of latent representations, images, and conditioning data, ensuring efficient reuse of previously computed or stored information. This node is essential for optimizing performance and resource utilization by avoiding redundant computations.
## Input types
### Required
- **`latent_path`**
    - Specifies the file path for the latent representation cache. If the file exists, it is loaded; otherwise, an error message is displayed. Providing a valid path allows the node to retrieve and utilize pre-computed latent representations, streamlining the workflow by bypassing the need for re-computation.
    - Comfy dtype: `STRING`
    - Python dtype: `Optional[str]`
- **`image_path`**
    - Specifies the file path for the image cache. If the file exists, it is loaded; otherwise, a message is displayed. By loading an existing image from cache, this input enables the node to efficiently reuse visual data, facilitating quicker iterations and resource conservation.
    - Comfy dtype: `STRING`
    - Python dtype: `Optional[str]`
- **`conditioning_path`**
    - Specifies the file path for the conditioning data cache. If the file exists, it is loaded; otherwise, an error message is displayed. This input is crucial for accessing pre-defined conditioning data, which can significantly impact the generation process by providing necessary context or constraints.
    - Comfy dtype: `STRING`
    - Python dtype: `Optional[str]`
## Output types
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`CONDITIONING`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Load_Cache:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "latent_path": ("STRING", {"default": "", "multiline":False}),
                "image_path": ("STRING", {"default": "", "multiline":False}),
                "conditioning_path": ("STRING", {"default": "", "multiline":False}),
            }
        }

    RETURN_TYPES = ("LATENT","IMAGE","CONDITIONING")
    RETURN_NAMES = ("LATENT","IMAGE","CONDITIONING")
    FUNCTION = "load_cache"

    CATEGORY = "WAS Suite/IO"

    def load_cache(self, latent_path=None, image_path=None, conditioning_path=None):

        if 'joblib' not in packages():
            install_package('joblib')

        import joblib

        input_path = os.path.join(WAS_SUITE_ROOT, 'cache')

        latent = None
        image = None
        conditioning = None

        if latent_path not in ["",None]:
            if os.path.exists(latent_path):
                latent = joblib.load(latent_path)
            else:
                cstr(f"Unable to locate cache file {latent_path}").error.print()

        if image_path not in ["",None]:
            if os.path.exists(image_path):
                image = joblib.load(image_path)
            else:
                cstr(f"Unable to locate cache file {image_path}").msg.print()

        if conditioning_path not in ["",None]:
            if os.path.exists(conditioning_path):
                conditioning = joblib.load(conditioning_path)
            else:
                cstr(f"Unable to locate cache file {conditioning_path}").error.print()

        return (latent, image, conditioning)

```
