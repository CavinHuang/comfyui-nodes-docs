---
tags:
- BackgroundRemoval
- Image
---

# Image Rembg (Remove Background)
## Documentation
- Class name: `Image Rembg (Remove Background)`
- Category: `WAS Suite/Image/AI`
- Output node: `False`

The Image Rembg (Remove Background) node is designed to process images by removing the background, enhancing the focus on the foreground elements. It utilizes various image processing techniques such as thresholding, blurring, and masking to achieve a transparent or solid-color background, thereby isolating the main subjects of the image.
## Input types
### Required
- **`images`**
    - The input images to be processed for background removal. These images undergo transformations to isolate the foreground from the background.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[PIL.Image.Image]`
- **`transparency`**
    - Controls the level of transparency applied to the background area of the images, allowing for fine-tuning of the background removal effect.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `float`
- **`model`**
    - Specifies the model used for background removal, enabling the selection of different algorithms based on the desired outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`post_processing`**
    - Indicates whether post-processing steps such as smoothing and edge refinement are applied to the processed images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`only_mask`**
    - When set to true, the node outputs only the mask used for background removal instead of the processed images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`alpha_matting`**
    - Enables alpha matting, which helps in achieving more accurate and finer background removal, especially around the edges of the foreground elements.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`alpha_matting_foreground_threshold`**
    - Sets the threshold for determining the foreground elements during the alpha matting process, affecting the precision of the background removal.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha_matting_background_threshold`**
    - Sets the threshold for determining the background elements during the alpha matting process, affecting the precision of the background removal.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha_matting_erode_size`**
    - Determines the size of the erosion applied to the mask during the alpha matting process, impacting the smoothness of the edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`background_color`**
    - Specifies the color applied to the background of the images after removal, allowing for customization of the background appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The output is a collection of images with the background removed. Each image in the collection has been processed to isolate the foreground elements.
    - Python dtype: `List[PIL.Image.Image]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ImageToMask](../../Comfy/Nodes/ImageToMask.md)
    - [SplitImageWithAlpha](../../Comfy/Nodes/SplitImageWithAlpha.md)



## Source code
```python
class WAS_Remove_Rembg:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "transparency": ("BOOLEAN", {"default": True},),
                "model": (["u2net", "u2netp", "u2net_human_seg", "silueta", "isnet-general-use", "isnet-anime"],),
                "post_processing": ("BOOLEAN", {"default": False}),
                "only_mask": ("BOOLEAN", {"default": False},),
                "alpha_matting": ("BOOLEAN", {"default": False},),
                "alpha_matting_foreground_threshold": ("INT", {"default": 240, "min": 0, "max": 255}),
                "alpha_matting_background_threshold": ("INT", {"default": 10, "min": 0, "max": 255}),
                "alpha_matting_erode_size": ("INT", {"default": 10, "min": 0, "max": 255}),
                "background_color": (["none", "black", "white", "magenta", "chroma green", "chroma blue"],),
                # "putalpha": ("BOOLEAN", {"default": True},),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "image_rembg"

    CATEGORY = "WAS Suite/Image/AI"

     # A helper function to convert from strings to logical boolean
     # Conforms to https://docs.python.org/3/library/stdtypes.html#truth-value-testing
     # With the addition of evaluating string representations of Falsey types
    def __convertToBool(self, x):

        # Evaluate string representation of False types
        if type(x) == str:
            x = x.strip()
            if (x.lower() == 'false'
                or x.lower() == 'none'
                or x == '0'
                or x == '0.0'
                or x == '0j'
                or x == "''"
                or x == '""'
                or x == "()"
                or x == "[]"
                or x == "{}"
                or x.lower() == "decimal(0)"
                or x.lower() == "fraction(0,1)"
                or x.lower() == "set()"
                or x.lower() == "range(0)"
            ):
                return False
            else:
                return True

        # Anything else will be evaluated by the bool function
        return bool(x)

    def image_rembg(
            self,
            images,
            transparency=True,
            model="u2net",
            alpha_matting=False,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10,
            post_processing=False,
            only_mask=False,
            background_color="none",
            # putalpha = False,
    ):

        # ComfyUI will allow strings in place of booleans, validate the input.
        transparency = transparency if type(transparency) is bool else self.__convertToBool(transparency)
        alpha_matting = alpha_matting if type(alpha_matting) is bool else self.__convertToBool(alpha_matting)
        post_processing = post_processing if type(post_processing) is bool else self.__convertToBool(post_processing)
        only_mask = only_mask if type(only_mask) is bool else self.__convertToBool(only_mask)

        if "rembg" not in packages():
            install_package("rembg")

        from rembg import remove, new_session

        os.environ['U2NET_HOME'] = os.path.join(MODELS_DIR, 'rembg')
        os.makedirs(os.environ['U2NET_HOME'], exist_ok=True)

        # Set bgcolor
        bgrgba = None
        if background_color == "black":
            bgrgba = [0, 0, 0, 255]
        elif background_color == "white":
            bgrgba = [255, 255, 255, 255]
        elif background_color == "magenta":
            bgrgba = [255, 0, 255, 255]
        elif background_color == "chroma green":
            bgrgba = [0, 177, 64, 255]
        elif background_color == "chroma blue":
            bgrgba = [0, 71, 187, 255]
        else:
            bgrgba = None

        if transparency and bgrgba is not None:
            bgrgba[3] = 0

        batch_tensor = []
        for image in images:
            image = tensor2pil(image)
            batch_tensor.append(pil2tensor(
                remove(
                    image,
                    session=new_session(model),
                    post_process_mask=post_processing,
                    alpha_matting=alpha_matting,
                    alpha_matting_foreground_threshold=alpha_matting_foreground_threshold,
                    alpha_matting_background_threshold=alpha_matting_background_threshold,
                    alpha_matting_erode_size=alpha_matting_erode_size,
                    only_mask=only_mask,
                    bgcolor=bgrgba,
                    # putalpha = putalpha,
                )
                .convert(('RGBA' if transparency else 'RGB'))))
        batch_tensor = torch.cat(batch_tensor, dim=0)

        return (batch_tensor,)

```
