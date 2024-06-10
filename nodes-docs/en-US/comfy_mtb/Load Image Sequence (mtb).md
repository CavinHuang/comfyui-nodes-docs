---
tags:
- Image
- ImageSequence
---

# Load Image Sequence (mtb)
## Documentation
- Class name: `Load Image Sequence (mtb)`
- Category: `mtb/IO`
- Output node: `False`

The MTB_LoadImageSequence node is designed to load a sequence of images from a specified folder, based on the current frame number. It supports loading individual frames or all frames in a batch, making it suitable for tasks that require processing image sequences, such as video editing or animation.
## Input types
### Required
- **`path`**
    - Specifies the folder path where the image sequence is stored. This path is used to locate and load the images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`current_frame`**
    - Determines which frame to load from the sequence. A special value of -1 indicates that all frames should be loaded as a batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The loaded image or images. In the case of loading all frames, this will be a batch of images.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The mask associated with the loaded image or images, if available.
    - Python dtype: `torch.Tensor`
- **`current_frame`**
    - Comfy dtype: `INT`
    - The current frame number that was loaded. This is relevant when loading individual frames.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_LoadImageSequence:
    """Load an image sequence from a folder. The current frame is used to determine which image to load.

    Usually used in conjunction with the `Primitive` node set to increment to load a sequence of images from a folder.
    Use -1 to load all matching frames as a batch.
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"default": "videos/####.png"}),
                "current_frame": (
                    "INT",
                    {"default": 0, "min": -1, "max": 9999999},
                ),
            }
        }

    CATEGORY = "mtb/IO"
    FUNCTION = "load_image"
    RETURN_TYPES = (
        "IMAGE",
        "MASK",
        "INT",
    )
    RETURN_NAMES = (
        "image",
        "mask",
        "current_frame",
    )

    def load_image(self, path=None, current_frame=0):
        load_all = current_frame == -1

        if load_all:
            log.debug(f"Loading all frames from {path}")
            frames = resolve_all_frames(path)
            log.debug(f"Found {len(frames)} frames")

            imgs = []
            masks = []

            for frame in frames:
                img, mask = img_from_path(frame)
                imgs.append(img)
                masks.append(mask)

            out_img = torch.cat(imgs, dim=0)
            out_mask = torch.cat(masks, dim=0)

            return (
                out_img,
                out_mask,
            )

        log.debug(f"Loading image: {path}, {current_frame}")
        print(f"Loading image: {path}, {current_frame}")
        resolved_path = resolve_path(path, current_frame)
        image_path = folder_paths.get_annotated_filepath(resolved_path)
        image, mask = img_from_path(image_path)
        return (
            image,
            mask,
            current_frame,
        )

    @staticmethod
    def IS_CHANGED(path="", current_frame=0):
        print(f"Checking if changed: {path}, {current_frame}")
        resolved_path = resolve_path(path, current_frame)
        image_path = folder_paths.get_annotated_filepath(resolved_path)
        if os.path.exists(image_path):
            m = hashlib.sha256()
            with open(image_path, "rb") as f:
                m.update(f.read())
            return m.digest().hex()
        return "NONE"

    # @staticmethod
    # def VALIDATE_INPUTS(path="", current_frame=0):

    #     print(f"Validating inputs: {path}, {current_frame}")
    #     resolved_path = resolve_path(path, current_frame)
    #     if not folder_paths.exists_annotated_filepath(resolved_path):
    #         return f"Invalid image file: {resolved_path}"
    #     return True

```
