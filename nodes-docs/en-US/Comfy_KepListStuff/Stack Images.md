---
tags:
- Image
- ImageTransformation
---

# Stack Images(Deprecated)
## Documentation
- Class name: `Stack Images`
- Category: `List Stuff`
- Output node: `True`

The Stack Images node is designed to aggregate multiple images into a single composite image. It supports various stacking modes and configurations, including the ability to handle batches of images, apply specific stacking directions, and incorporate optional labels for both horizontal and vertical orientations. This functionality is particularly useful for visualizing collections of images in a structured and coherent manner.
## Input types
### Required
- **`images`**
    - A list of images to be stacked together. This parameter is crucial for defining the set of images that will be processed and combined into a single composite image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Tensor]`
- **`splits`**
    - Defines how the images are split into batches or groups for stacking. This parameter influences the organization of images within the final composite image.
    - Comfy dtype: `INT`
    - Python dtype: `List[int]`
- **`stack_mode`**
    - Specifies the direction (horizontal or vertical) in which the images within a batch are stacked. This affects the layout of the composite image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`batch_stack_mode`**
    - Determines the stacking direction of batches of images. This parameter is essential for defining the overall structure of the composite image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`horizontal_labels`**
    - Optional labels for the horizontal axis, used when the stacking direction allows for horizontal labeling. Enhances the interpretability of the composite image.
    - Comfy dtype: `*`
    - Python dtype: `Optional[List[str]]`
- **`vertical_labels`**
    - Optional labels for the vertical axis, used when the stacking direction allows for vertical labeling. Enhances the interpretability of the composite image.
    - Comfy dtype: `*`
    - Python dtype: `Optional[List[str]]`
## Output types
- **`Image`**
    - Comfy dtype: `IMAGE`
    - The resulting composite image after stacking.
    - Python dtype: `Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class StackImages:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "images": ("IMAGE",),
                "splits": ("INT", {"forceInput": True, "min": 1}),
                "stack_mode": (["horizontal", "vertical"], {"default": "horizontal"}),
                "batch_stack_mode": (["horizontal", "vertical"], {"default": "horizontal"}),
            },
            "optional": {
                "horizontal_labels": (ANY,{}),
                "vertical_labels": (ANY,{}),
            }
        }

    RELOAD_INST = True
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("Image",)
    INPUT_IS_LIST = (True,)
    OUTPUT_IS_LIST = (False,)
    OUTPUT_NODE = True
    FUNCTION = "stack_images"

    CATEGORY = "List Stuff"

    def stack_images(
            self,
            images: List[Tensor],
            splits: List[int],
            stack_mode: List[str],
            batch_stack_mode: List[str],
            horizontal_labels: Optional[List[str]] = None,
            vertical_labels: Optional[List[str]] = None,
    ) -> Tuple[Tensor]:
        if len(stack_mode) != 1:
            raise Exception("Only single stack mode supported.")
        if len(batch_stack_mode) != 1:
            raise Exception("Only single batch stack mode supported.")

        stack_direction = stack_mode[0]
        batch_stack_direction = batch_stack_mode[0]

        if len(splits) == 1:
            splits = splits * (int(len(images) / splits[0]))
            if sum(splits) != len(images):
                splits.append(len(images) - sum(splits))
        else:
            if sum(splits) != len(images):
                raise Exception("Sum of splits must equal number of images.")

        batches = images
        batch_size = len(batches[0])

        image_h, image_w, _ = batches[0][0].size()
        if batch_stack_direction == "horizontal":
            batch_h = image_h
            # stack horizontally
            batch_w = image_w * batch_size
        else:
            # stack vertically
            batch_h = image_h * batch_size
            batch_w = image_w

        if stack_direction == "horizontal":
            full_w = batch_w * len(splits)
            full_h = batch_h * max(splits)
        else:
            full_w = batch_w * max(splits)
            full_h = batch_h * len(splits)

        y_label_offset = 0
        has_horizontal_labels = False
        if horizontal_labels is not None:
            horizontal_labels = [str(lbl) for lbl in horizontal_labels]
            if stack_direction == "horizontal":
                if len(horizontal_labels) != len(splits):
                    raise Exception("Number of horizontal labels must match number of splits.")
            else:
                if len(horizontal_labels) != max(splits):
                    raise Exception("Number of horizontal labels must match maximum split size.")
            full_h += 60
            y_label_offset = 60
            has_horizontal_labels = True

        x_label_offset = 0
        has_vertical_labels = False
        if vertical_labels is not None:
            vertical_labels = [str(lbl) for lbl in vertical_labels]
            if stack_direction == "horizontal":
                if len(vertical_labels) != max(splits):
                    raise Exception("Number of vertical labels must match maximum split size.")
            else:
                if len(vertical_labels) != len(splits):
                    raise Exception("Number of vertical labels must match number of splits.")
            full_w += 60
            x_label_offset = 60
            has_vertical_labels = True


        full_image = Image.new("RGB", (full_w, full_h))

        batch_idx = 0

        if has_horizontal_labels:
            assert horizontal_labels is not None
            font = ImageFont.truetype(fm.findfont(fm.FontProperties()), 60)
            for label_idx, label in enumerate(horizontal_labels):
                x_offset = (batch_w * label_idx) + x_label_offset
                draw = ImageDraw.Draw(full_image)
                draw.rectangle((x_offset, 0, x_offset + batch_w, 60), fill="#ffffff")
                draw.text((x_offset + (batch_w / 2), 0), label, fill="red", font=font)

        if has_vertical_labels:
            assert vertical_labels is not None
            font = ImageFont.truetype(fm.findfont(fm.FontProperties()), 60)
            for label_idx, label in enumerate(vertical_labels):
                y_offset = (batch_h * label_idx) + y_label_offset
                draw = ImageDraw.Draw(full_image)
                draw.rectangle((0, y_offset, 60, y_offset + batch_h), fill="#ffffff")
                draw.text((0, y_offset + (batch_h / 2)), label, fill="red", font=font)

        for split_idx, split in enumerate(splits):
            for idx_in_split in range(split):
                batch_img = Image.new("RGB", (batch_w, batch_h))
                batch = batches[batch_idx + idx_in_split]
                if batch_stack_direction == "horizontal":
                    for img_idx, img in enumerate(batch):
                        x_offset = image_w * img_idx
                        batch_img.paste(tensor2pil(img), (x_offset, 0))
                else:
                    for img_idx, img in enumerate(batch):
                        y_offset = image_h * img_idx
                        batch_img.paste(tensor2pil(img), (0, y_offset))

                if stack_direction == "horizontal":
                    x_offset = batch_w * split_idx + x_label_offset
                    y_offset = batch_h * idx_in_split + y_label_offset
                else:
                    x_offset = batch_w * idx_in_split + x_label_offset
                    y_offset = batch_h * split_idx + y_label_offset
                full_image.paste(batch_img, (x_offset, y_offset))

            batch_idx += split
        return (pil2tensor(full_image),)

```
