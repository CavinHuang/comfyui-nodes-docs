
# Documentation
- Class name: `XYImage`
- Category: `List Stuff`
- Output node: `True`
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

XYImage节点设计用于复杂的图像生成和操作任务，包括图像分割、翻转和批量堆叠。它支持在不同轴上添加标签，并能够在多维（启用z轴）环境中处理图像，使其适用于各种图像处理和可视化需求。

# Input types
## Required
- images
    - 要处理的图像列表。这个参数至关重要，因为它是节点将通过分割、翻转和堆叠操作进行处理的主要数据。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- splits
    - 定义如何分割图像。这个参数直接影响输出图像的结构和布局，影响其分段和组织方式。
    - Comfy dtype: INT
    - Python dtype: List[int]
- flip_axis
    - 指定应沿哪些轴翻转图像。这个参数允许调整图像方向，增强图像展示和分析的灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- batch_stack_mode
    - 决定如何将图像批量堆叠在一起。这个参数对定义组合图像输出的整体结构和布局至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- z_enabled
    - 指示是否启用z轴进行图像处理。这个参数启用多维图像处理，允许进行更复杂的图像操作和可视化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

## Optional
- x_main_label
    - x轴的主要标签。这个可选参数允许为x轴添加描述性标签，增强图像的可解释性。
    - Comfy dtype: STRING
    - Python dtype: Optional[List[str]]
- y_main_label
    - y轴的主要标签。与x_main_label类似，这通过为y轴添加描述性标签来增强图像的可解释性。
    - Comfy dtype: STRING
    - Python dtype: Optional[List[str]]
- z_main_label
    - z轴的主要标签，在z_enabled为True时使用。这通过为z轴添加描述性标签来增强多维图像的可解释性。
    - Comfy dtype: STRING
    - Python dtype: Optional[List[str]]
- x_labels
    - x轴上每个段的标签。这个参数为图像的各个部分添加详细描述，有助于其分析和理解。
    - Comfy dtype: *
    - Python dtype: Optional[List[str]]
- y_labels
    - y轴上每个段的标签，类似于x_labels，为图像的各个部分提供详细描述。
    - Comfy dtype: *
    - Python dtype: Optional[List[str]]
- z_labels
    - z轴上每个段的标签，在z_enabled为True时使用。这为多维图像的各个部分添加详细描述。
    - Comfy dtype: *
    - Python dtype: Optional[List[str]]

# Output types
- Image
    - 应用分割、翻转和堆叠等操作后的处理图像。这个输出很重要，因为它代表了节点图像操作能力的集大成者，可以进行进一步使用或分析。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class XYImage:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "images": ("IMAGE",),
                "splits": ("INT", {"forceInput": True, "min": 1}),
                "flip_axis": (["False", "True"], {"default": "False"}),
                "batch_stack_mode": (["horizontal", "vertical"], {"default": "horizontal"}),
                "z_enabled": (["False", "True"], {"default": "False"}),
            },
            "optional": {
                "x_main_label": ("STRING", {}),
                "y_main_label": ("STRING", {}),
                "z_main_label": ("STRING", {}),
                "x_labels": (ANY,{}),
                "y_labels": (ANY,{}),
                "z_labels": (ANY,{}),
            }
        }

    RELOAD_INST = True
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("Image",)
    INPUT_IS_LIST = (True,)
    OUTPUT_IS_LIST = (True,)
    OUTPUT_NODE = True
    FUNCTION = "xy_image"

    CATEGORY = "List Stuff"


    MAIN_LABEL_SIZE = 60
    LABEL_SIZE = 60
    Z_LABEL_SIZE = 60
    LABEL_COLOR = "#000"
    def xy_image(
            self,
            images: List[Tensor],
            splits: List[int],
            flip_axis: List[str],
            batch_stack_mode: List[str],
            z_enabled: List[str],
            x_main_label: Optional[List[str]] = None,
            y_main_label: Optional[List[str]] = None,
            z_main_label: Optional[List[str]] = None,
            x_labels: Optional[List[str]] = None,
            y_labels: Optional[List[str]] = None,
            z_labels: Optional[List[str]] = None,
    ) -> Tuple[List[Tensor]]:
        if len(flip_axis) != 1:
            raise Exception("Only single flip_axis value supported.")
        if len(batch_stack_mode) != 1:
            raise Exception("Only single batch stack mode supported.")
        if len(z_enabled) != 1:
            raise Exception("Only single z_enabled value supported.")
        if x_main_label is not None and len(x_main_label) != 1:
            raise Exception("Only single x_main_label value supported.")
        if y_main_label is not None and len(y_main_label) != 1:
            raise Exception("Only single y_main_label value supported.")
        if z_main_label is not None and len(z_main_label) != 1:
            raise Exception("Only single z_main_label value supported.")

        if x_main_label is not None and not isinstance(x_main_label[0], str):
            try:
                x_main_label[0] = str(x_main_label[0])
            except:
                raise Exception("x_main_label must be a string or convertible to a string.")
        if y_main_label is not None and not isinstance(y_main_label[0], str):
            try:
                y_main_label[0] = str(y_main_label[0])
            except:
                raise Exception("y_main_label must be a string or convertible to a string.")
        if z_main_label is not None and not isinstance(z_main_label[0], str):
            try:
                z_main_label[0] = str(z_main_label[0])
            except:
                raise Exception("z_main_label must be a string or convertible to a string.")

        if x_main_label is not None and x_main_label[0] == '':
            x_main_label = None
        if y_main_label is not None and y_main_label[0] == '':
            y_main_label = None
        if z_main_label is not None and z_main_label[0] == '':
            z_main_label = None

        stack_direction = "horizontal"
        if flip_axis[0] == "True":
            stack_direction = "vertical"
            x_labels, y_labels = y_labels, x_labels
            x_main_label, y_main_label = y_main_label, x_main_label

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

        # TODO: Some better way...
        # Currently chops splits to match x_labels/y_labels and then loops over the split set over and over
        num_z = 1
        splits_per_z = len(splits)
        images_per_z = len(images)
        if z_enabled[0] == "True":
            if y_labels is None or x_labels is None:
                raise Exception("Must provide x_labels and y_labels when z_enabled is True.")

            if stack_direction == "horizontal":
                splits_per_z = len(x_labels)
            else:
                splits_per_z = len(y_labels)

            num_z = int(len(splits) / splits_per_z)
            splits = splits[:splits_per_z]
            images_per_z = sum(splits)

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
        grid_w = full_w
        _ = full_h

        y_label_offset = 0
        has_horizontal_labels = False
        if x_labels is not None:
            x_labels = [str(lbl) for lbl in x_labels]
            if stack_direction == "horizontal":
                if len(x_labels) != len(splits):
                    raise Exception("Number of horizontal labels must match number of splits.")
            else:
                if len(x_labels) != max(splits):
                    raise Exception("Number of horizontal labels must match maximum split size.")
            full_h += self.LABEL_SIZE
            y_label_offset = self.LABEL_SIZE
            has_horizontal_labels = True

        x_label_offset = 0
        has_vertical_labels = False
        if y_labels is not None:
            y_labels = [str(lbl) for lbl in y_labels]
            if stack_direction == "horizontal":
                if len(y_labels) != max(splits):
                    raise Exception(f"Number of vertical labels must match maximum split size. Got {len(y_labels)} labels for {max(splits)} splits.")
            else:
                if len(y_labels) != len(splits):
                    raise Exception(f"Number of vertical labels must match number of splits. Got {len(y_labels)} labels for {len(splits)} splits.")
            full_w += self.LABEL_SIZE
            x_label_offset = self.LABEL_SIZE
            has_vertical_labels = True

        has_z_labels = False
        if z_labels is not None:
            has_z_labels = True
            z_labels = [str(lbl) for lbl in z_labels]
            if z_main_label is not None:
                z_labels = [f"{z_main_label[0]}: {lbl}" for lbl in z_labels]
            full_h += self.Z_LABEL_SIZE
            y_label_offset += self.Z_LABEL_SIZE
            if len(z_labels) != num_z:
                raise Exception(f"Number of z_labels must match number of z splits. Got {len(z_labels)} labels for {num_z} splits.")

        has_main_x_label = False
        if x_main_label is not None:
            full_h += self.MAIN_LABEL_SIZE
            y_label_offset += self.MAIN_LABEL_SIZE
            has_main_x_label = True

        has_main_y_label = False
        if y_main_label is not None:
            full_w += self.MAIN_LABEL_SIZE
            x_label_offset += self.MAIN_LABEL_SIZE
            has_main_y_label = True

        images = []
        for z_idx in range(num_z):
            full_image = Image.new("RGB", (full_w, full_h))
            full_draw = ImageDraw.Draw(full_image)

            full_draw.rectangle((0, 0, full_w, full_h), fill="#ffffff")

            batch_idx = 0
            active_y_offset = 0
            active_x_offset = 0
            if has_z_labels:
                font = ImageFont.truetype(fm.findfont(fm.FontProperties()), self.Z_LABEL_SIZE)
                full_draw.rectangle((0, 0, full_w, self.Z_LABEL_SIZE), fill="#ffffff")
                full_draw.text((grid_w//2 + x_label_offset, 0),  z_labels[z_idx], anchor='ma', fill=self.LABEL_COLOR, font=font)
                active_y_offset += self.Z_LABEL_SIZE

            if has_main_x_label:
                assert x_main_label is not None
                font = ImageFont.truetype(fm.findfont(fm.FontProperties()), self.MAIN_LABEL_SIZE)
                full_draw.rectangle((0, active_y_offset, full_w, self.MAIN_LABEL_SIZE + active_y_offset), fill="#ffffff")
                full_draw.text((grid_w//2 + x_label_offset, 0 + active_y_offset), x_main_label[0], anchor='ma', fill=self.LABEL_COLOR, font=font)
                active_y_offset += self.MAIN_LABEL_SIZE

            if has_horizontal_labels:
                assert x_labels is not None
                font = ImageFont.truetype(fm.findfont(fm.FontProperties()), self.LABEL_SIZE)
                for label_idx, label in enumerate(x_labels):
                    x_offset = (batch_w * label_idx) + x_label_offset
                    full_draw.rectangle((x_offset, 0 + active_y_offset, x_offset + batch_w, self.LABEL_SIZE + active_y_offset), fill="#ffffff")
                    full_draw.text((x_offset + (batch_w / 2), 0 + active_y_offset), label, anchor='ma', fill=self.LABEL_COLOR, font=font)

            if has_main_y_label:
                assert y_main_label is not None
                font = ImageFont.truetype(fm.findfont(fm.FontProperties()), self.MAIN_LABEL_SIZE)

                img_txt = Image.new('RGB', (full_h - active_y_offset, self.MAIN_LABEL_SIZE))
                draw_txt = ImageDraw.Draw(img_txt)
                draw_txt.rectangle((0, 0, full_h - active_y_offset, self.MAIN_LABEL_SIZE), fill="#ffffff")
                draw_txt.text(((full_h - active_y_offset)//2, 0),  y_main_label[0], anchor='ma', fill=self.LABEL_COLOR, font=font)
                img_txt = img_txt.rotate(90, expand=True)
                full_image.paste(img_txt, (active_x_offset, active_y_offset))
                active_x_offset += self.MAIN_LABEL_SIZE

            if has_vertical_labels:
                assert y_labels is not None
                font = ImageFont.truetype(fm.findfont(fm.FontProperties()), self.LABEL_SIZE)
                for label_idx, label in enumerate(y_labels):
                    y_offset = (batch_h * label_idx) + y_label_offset

                    img_txt = Image.new('RGB', (batch_h, self.LABEL_SIZE))
                    draw_txt = ImageDraw.Draw(img_txt)
                    draw_txt.rectangle((0, 0, batch_h, self.LABEL_SIZE), fill="#ffffff")
                    draw_txt.text((batch_h//2, 0),  label, anchor='ma', fill=self.LABEL_COLOR, font=font)
                    img_txt = img_txt.rotate(90, expand=True)
                    full_image.paste(img_txt, (active_x_offset, y_offset))

            for split_idx, split in enumerate(splits):
                for idx_in_split in range(split):
                    batch_img = Image.new("RGB", (batch_w, batch_h))
                    batch = batches[batch_idx + idx_in_split + images_per_z * z_idx]
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
            images.append(pil2tensor(full_image))
        return (images,)

```
