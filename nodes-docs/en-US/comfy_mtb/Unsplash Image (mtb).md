# Unsplash Image (mtb)
## Documentation
- Class name: `Unsplash Image (mtb)`
- Category: `mtb/generate`
- Output node: `False`

The MTB_UnsplashImage node is designed to fetch and return an image from Unsplash based on specified dimensions and optional keywords. It utilizes the Unsplash API to dynamically source images, which can be tailored by the user through parameters such as image size and thematic keywords.
## Input types
### Required
- **`width`**
    - Specifies the desired width of the image to be fetched. This dimension directly influences the resolution of the returned image, impacting its clarity and detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the image to be fetched. Similar to width, this parameter affects the resolution and aspect ratio of the resulting image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`random_seed`**
    - A seed value to introduce randomness in the image selection process, ensuring that requests for images are not deterministic and can vary with each call.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`keyword`**
    - An optional parameter that allows the user to specify a keyword to narrow down the image search, making the results more relevant to the desired theme or context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image retrieved from Unsplash, converted into a tensor format suitable for further processing or display within the node's operational context.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_UnsplashImage:
    """Unsplash Image given a keyword and a size"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": (
                    "INT",
                    {"default": 512, "max": 8096, "min": 0, "step": 1},
                ),
                "height": (
                    "INT",
                    {"default": 512, "max": 8096, "min": 0, "step": 1},
                ),
                "random_seed": (
                    "INT",
                    {"default": 0, "max": 1e5, "min": 0, "step": 1},
                ),
            },
            "optional": {
                "keyword": ("STRING", {"default": "nature"}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "do_unsplash_image"
    CATEGORY = "mtb/generate"

    def do_unsplash_image(self, width, height, random_seed, keyword=None):
        import io

        import requests

        base_url = "https://source.unsplash.com/random/"

        if width and height:
            base_url += f"/{width}x{height}"

        if keyword:
            keyword = keyword.replace(" ", "%20")
            base_url += f"?{keyword}&{random_seed}"
        else:
            base_url += f"?&{random_seed}"
        try:
            log.debug(f"Getting unsplash image from {base_url}")
            response = requests.get(base_url)
            response.raise_for_status()

            image = Image.open(io.BytesIO(response.content))
            return (
                pil2tensor(
                    image,
                ),
            )

        except requests.exceptions.RequestException as e:
            print("Error retrieving image:", e)
            return (None,)

```
