---
tags:
- DepthMap
- DepthMapEstimation
- Image
---

# MiDaS Mask Image
## Documentation
- Class name: `MiDaS Mask Image`
- Category: `WAS Suite/Image/AI`
- Output node: `False`

The node 'MiDaS Mask Image' utilizes the MiDaS model to separate the background and foreground of an image by approximating its depth. This process involves converting the input image into a format suitable for the model, applying the MiDaS model to estimate depth, and then using this depth information to create a mask that distinguishes between the foreground and background elements of the image.
## Input types
### Required
- **`image`**
    - The input image tensor that the MiDaS model will process to approximate depth and generate a mask separating the background from the foreground.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`use_cpu`**
    - A flag indicating whether to use the CPU instead of a GPU for running the MiDaS model, which may be necessary based on the available hardware.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`midas_model`**
    - Specifies the version of the MiDaS model to use for depth approximation, affecting the precision and performance of the mask generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`remove`**
    - Determines whether the foreground or background should be removed based on the depth estimation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`threshold`**
    - A flag indicating whether to apply thresholding to the depth mask to further refine the separation between foreground and background.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`threshold_low`**
    - The lower bound for thresholding the depth mask, enhancing the mask's focus on relevant depth regions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`threshold_mid`**
    - The mid-point for thresholding the depth mask, used in conjunction with the low and high values to adjust the mask's sensitivity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`threshold_high`**
    - The upper bound for thresholding the depth mask, limiting the mask's sensitivity to distant depth regions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`smoothing`**
    - The amount of Gaussian blur to apply to the depth mask for smoothing edges and transitions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`background_red`**
    - The red component of the background color, used when removing the background or foreground based on depth.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`background_green`**
    - The green component of the background color, used in conjunction with red and blue to define the background color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`background_blue`**
    - The blue component of the background color, completing the RGB specification for the background color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with either the foreground or background removed, based on the depth estimation and specified parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MiDaS_Background_Foreground_Removal:
    def __init__(self):
        self.midas_dir = os.path.join(MODELS_DIR, 'midas')

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "use_cpu": (["false", "true"],),
                "midas_model": (["DPT_Large", "DPT_Hybrid", "DPT_Small"],),
                "remove": (["background", "foregroud"],),
                "threshold": (["false", "true"],),
                "threshold_low": ("FLOAT", {"default": 10, "min": 0, "max": 255, "step": 1}),
                "threshold_mid": ("FLOAT", {"default": 200, "min": 0, "max": 255, "step": 1}),
                "threshold_high": ("FLOAT", {"default": 210, "min": 0, "max": 255, "step": 1}),
                "smoothing": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 16.0, "step": 0.01}),
                "background_red": ("INT", {"default": 0, "min": 0, "max": 255, "step": 1}),
                "background_green": ("INT", {"default": 0, "min": 0, "max": 255, "step": 1}),
                "background_blue": ("INT", {"default": 0, "min": 0, "max": 255, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE", "IMAGE")
    FUNCTION = "midas_remove"

    CATEGORY = "WAS Suite/Image/AI"

    def midas_remove(self,
                     image,
                     midas_model,
                     use_cpu='false',
                     remove='background',
                     threshold='false',
                     threshold_low=0,
                     threshold_mid=127,
                     threshold_high=255,
                     smoothing=0.25,
                     background_red=0,
                     background_green=0,
                     background_blue=0):

        global MIDAS_INSTALLED

        if not MIDAS_INSTALLED:
            self.install_midas()

        import cv2 as cv

        # Convert the input image tensor to a numpy and PIL Image
        i = 255. * image.cpu().numpy().squeeze()
        img = i
        # Original image
        img_original = tensor2pil(image).convert('RGB')

        cstr("Downloading and loading MiDaS Model...").msg.print()
        torch.hub.set_dir(self.midas_dir)
        midas = torch.hub.load("intel-isl/MiDaS", midas_model, trust_repo=True)
        device = torch.device("cuda") if torch.cuda.is_available(
        ) and use_cpu == 'false' else torch.device("cpu")

        cstr(f"MiDaS is using device: {device}").msg.print()

        midas.to(device).eval()
        midas_transforms = torch.hub.load("intel-isl/MiDaS", "transforms")

        if midas_model == "DPT_Large" or midas_model == "DPT_Hybrid":
            transform = midas_transforms.dpt_transform
        else:
            transform = midas_transforms.small_transform

        img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
        input_batch = transform(img).to(device)

        cstr("Approximating depth from image.").msg.print()

        with torch.no_grad():
            prediction = midas(input_batch)
            prediction = torch.nn.functional.interpolate(
                prediction.unsqueeze(1),
                size=img.shape[:2],
                mode="bicubic",
                align_corners=False,
            ).squeeze()

        # Invert depth map
        if remove == 'foreground':
            depth = (255 - prediction.cpu().numpy().astype(np.uint8))
            depth = depth.astype(np.float32)
        else:
            depth = prediction.cpu().numpy().astype(np.float32)
        depth = depth * 255 / (np.max(depth)) / 255
        depth = Image.fromarray(np.uint8(depth * 255))

        # Threshold depth mask
        if threshold == 'true':
            levels = self.AdjustLevels(
                threshold_low, threshold_mid, threshold_high)
            depth = levels.adjust(depth.convert('RGB')).convert('L')
        if smoothing > 0:
            depth = depth.filter(ImageFilter.GaussianBlur(radius=smoothing))
        depth = depth.resize(img_original.size).convert('L')

        # Validate background color arguments
        background_red = int(background_red) if isinstance(
            background_red, (int, float)) else 0
        background_green = int(background_green) if isinstance(
            background_green, (int, float)) else 0
        background_blue = int(background_blue) if isinstance(
            background_blue, (int, float)) else 0

        # Create background color tuple
        background_color = (background_red, background_green, background_blue)

        # Create background image
        background = Image.new(
            mode="RGB", size=img_original.size, color=background_color)

        # Composite final image
        result_img = Image.composite(img_original, background, depth)

        del midas, device, midas_transforms
        del transform, img, img_original, input_batch, prediction

        return (pil2tensor(result_img), pil2tensor(depth.convert('RGB')))

    class AdjustLevels:
        def __init__(self, min_level, mid_level, max_level):
            self.min_level = min_level
            self.mid_level = mid_level
            self.max_level = max_level

        def adjust(self, im):
            # load the image

            # convert the image to a numpy array
            im_arr = np.array(im)

            # apply the min level adjustment
            im_arr[im_arr < self.min_level] = self.min_level

            # apply the mid level adjustment
            im_arr = (im_arr - self.min_level) * \
                (255 / (self.max_level - self.min_level))
            im_arr[im_arr < 0] = 0
            im_arr[im_arr > 255] = 255
            im_arr = im_arr.astype(np.uint8)

            # apply the max level adjustment
            im = Image.fromarray(im_arr)
            im = ImageOps.autocontrast(im, cutoff=self.max_level)

            return im

    def install_midas(self):
        global MIDAS_INSTALLED
        if 'timm' not in packages():
            install_package("timm")
        MIDAS_INSTALLED = True

```
