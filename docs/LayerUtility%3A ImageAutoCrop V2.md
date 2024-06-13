# Documentation
- Class name: ImageAutoCrop
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

自动抠图并按照遮罩裁切图片。可指定生成图片的背景颜色、长宽比和大小。这个节点是为生成训练模型的图片素材而设计的。
*请参照 [SegmentAnythingUltra](https://github.com/chflame163/ComfyUI_LayerStyle/blob/main/README_CN.MD#SegmentAnythingUltra) 和 [RemBgUltra](https://github.com/chflame163/ComfyUI_LayerStyle/blob/main/README_CN.MD#RemBgUltra) 节点的模型安装方法安装模型。

ImageAutoCrop的V2升级版

增加mask可选输入。当有mask输入时，直接使用该输入跳过内置遮罩生成。
增加fill_background, 当此项设置为False时将不处理背景，并且超出画幅的部分不纳入输出范围。
aspect_ratio增加original(原始画面宽高比)选项。
scale_by: 允许按长边、短边、宽度或高度指定尺寸缩放。
scale_by_length: 这里的数值作为scale_by指定边的长度。

# Input types
## Required

- image
    - 输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- background_color
    - 背景颜色。
    - Comfy dtype: STRING
    - Python dtype: str

- aspect_ratio
    - 输出的宽高比。这里提供了常见的画幅比例， "custom"为自定义比例。
    - Comfy dtype: STRING
    - Python dtype: str

- proportional_width
    - 比例宽。如果aspect_ratio选项不是"custom"，此处设置将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- proportional_height
    - 比例高。如果aspect_ratio选项不是"custom"，此处设置将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- scale_to_longest_side
    - 允许按长边尺寸缩放。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- longest_side
    - scale_to_longest_side被设置为True时，此项将作为是图像长边的长度。
    - Comfy dtype: INT
    - Python dtype: int

- detect
    - 探测方法，min_bounding_rect是最小外接矩形, max_inscribed_rect是最大内接矩形。
    - Comfy dtype: STRING
    - Python dtype: str

- border_reserve
    - 保留边框。在探测到的遮罩主体区域之外扩展裁切范围。
    - Comfy dtype: INT
    - Python dtype: int

- ultra_detail_range
    - 遮罩边缘超精细处理范围，0为不处理，可以节省生成时间。
    - Comfy dtype: INT
    - Python dtype: int

- matting_method
    - 生成遮罩的方法。有Segment Anything和 RMBG 1.4两种方法。RMBG 1.4运行速度更快。
    - Comfy dtype: STRING
    - Python dtype: str

- sam_model
    - 此处选择Segment Anything所使用的sam模型。
    - Comfy dtype: STRING
    - Python dtype: str

- grounding_dino_model
    - 此处选择Segment Anything所使用的grounding_dino模型。
    - Comfy dtype: STRING
    - Python dtype: str

- sam_threshold
    - Segment Anything的阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- sam_prompt
    - Segment Anything的提示词。
    - Comfy dtype: STRING
    - Python dtype: str

- fill_background
    - 当此项设置为False时将不处理背景，并且超出画幅的部分不纳入输出范围。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- scale_by
    - 允许按长边、短边、宽度或高度指定尺寸缩放。
    - Comfy dtype: STRING
    - Python dtype: str

- scale_by_length
    - 这里的数值作为scale_by指定边的长度。
    - Comfy dtype: INT
    - Python dtype: int


## Optional

- mask
    - 输入遮罩。当有mask输入时，直接使用该输入跳过内置遮罩生成。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types

- cropped_image
    - 裁切并更换背景后的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- box_preview
    - 裁切位置预览。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- cropped_mask
    - 裁切后的遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


# Usage tips
- Infra type: CPU

# Source code
```
class ImageAutoCropV2:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        matting_method_list = ['RMBG 1.4', 'SegmentAnything']
        detect_mode = ['min_bounding_rect', 'max_inscribed_rect', 'mask_area']
        ratio_list = ['1:1', '3:2', '4:3', '16:9', '2:3', '3:4', '9:16', 'custom', 'detect_mask', 'original']
        scale_to_side_list = ['None', 'longest', 'shortest', 'width', 'height']
        return {
            "required": {
                "image": ("IMAGE", ),  #
                "fill_background": ("BOOLEAN", {"default": True}),  # 是否填充背景
                "background_color": ("STRING", {"default": "#FFFFFF"}),  # 背景颜色
                "aspect_ratio": (ratio_list,),
                "proportional_width": ("INT", {"default": 1, "min": 1, "max": 999, "step": 1}),
                "proportional_height": ("INT", {"default": 1, "min": 1, "max": 999, "step": 1}),
                "scale_to_side": (scale_to_side_list,),  # 是否按长边缩放
                "scale_to_length": ("INT", {"default": 1024, "min": 4, "max": 999999, "step": 1}),
                "detect": (detect_mode,),
                "border_reserve": ("INT", {"default": 100, "min": -9999, "max": 9999, "step": 1}),
                "ultra_detail_range": ("INT", {"default": 0, "min": 0, "max": 256, "step": 1}),
                "matting_method": (matting_method_list,),
                "sam_model": (list_sam_model(),),
                "grounding_dino_model": (list_groundingdino_model(),),
                "sam_threshold": ("FLOAT", {"default": 0.3, "min": 0, "max": 1.0, "step": 0.01}),
                "sam_prompt": ("STRING", {"default": "subject"}),
            },
            "optional": {
                "mask": ("MASK",),  #
            }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE", "MASK",)
    RETURN_NAMES = ("cropped_image", "box_preview", "cropped_mask",)
    FUNCTION = 'image_auto_crop_v2'
    CATEGORY = '😺dzNodes/LayerUtility'

    def image_auto_crop_v2(self, image, fill_background, background_color, aspect_ratio,
                        proportional_width, proportional_height,
                        scale_to_side, scale_to_length, detect, border_reserve,
                        ultra_detail_range, matting_method,
                        sam_model, grounding_dino_model, sam_threshold, sam_prompt,
                        mask=None,
                        ):

        ret_images = []
        ret_box_previews = []
        ret_masks = []
        input_images = []
        input_masks = []
        crop_boxs = []

        global SAM_MODEL
        global DINO_MODEL
        global previous_sam_model
        global previous_dino_model

        for l in image:
            input_images.append(torch.unsqueeze(l, 0))
            m = tensor2pil(l)
            if m.mode == 'RGBA':
                input_masks.append(m.split()[-1])
        if mask is not None:
            if mask.dim() == 2:
                mask = torch.unsqueeze(mask, 0)
            input_masks = []
            for m in mask:
                input_masks.append(tensor2pil(torch.unsqueeze(m, 0)).convert('L'))

        if len(input_masks) > 0 and len(input_masks) != len(input_images):
            input_masks = []
            log(f"Warning, {NODE_NAME} unable align alpha to image, drop it.", message_type='warning')

        fit = 'letterbox'
        if aspect_ratio == 'custom':
            ratio = proportional_width / proportional_height
        elif aspect_ratio == 'original':
            _image = tensor2pil(input_images[0])
            ratio = _image.width / _image.height
        elif aspect_ratio == 'detect_mask':
            ratio = 0
            fit = 'fill'
        else:
            s = aspect_ratio.split(":")
            ratio = int(s[0]) / int(s[1])

        for i in range(len(input_images)):
            _image = tensor2pil(input_images[i]).convert('RGB')

            if len(input_masks) > 0:
                _mask = input_masks[i]
            else:
                if matting_method == 'SegmentAnything':
                    if previous_sam_model != sam_model:
                        SAM_MODEL = load_sam_model(sam_model)
                        previous_sam_model = sam_model
                    if previous_dino_model != grounding_dino_model:
                        DINO_MODEL = load_groundingdino_model(grounding_dino_model)
                        previous_dino_model = grounding_dino_model
                    item = _image.convert('RGBA')
                    boxes = groundingdino_predict(DINO_MODEL, item, sam_prompt, sam_threshold)
                    (_, _mask) = sam_segment(SAM_MODEL, item, boxes)
                    _mask = mask2image(_mask[0])
                else:
                    _mask = RMBG(_image)
                if ultra_detail_range:
                    _mask = tensor2pil(mask_edge_detail(input_images[i], pil2tensor(_mask), ultra_detail_range, 0.01, 0.99))
            bluredmask = gaussian_blur(_mask, 20).convert('L')
            x = 0
            y = 0
            width = 0
            height = 0
            x_offset = 0
            y_offset = 0
            if detect == "min_bounding_rect":
                (x, y, width, height) = min_bounding_rect(bluredmask)
            elif detect == "max_inscribed_rect":
                (x, y, width, height) = max_inscribed_rect(bluredmask)
            else:
                (x, y, width, height) = mask_area(bluredmask)

            canvas_width, canvas_height = _image.size

            x1 = x - border_reserve
            y1 = y - border_reserve
            x2 = x + width + border_reserve
            y2 = y + height + border_reserve

            if x1 < 0:
                if fill_background:
                    canvas_width -= x1
                    x_offset = -x1
                else:
                    x1 = 0
            if y1 < 0:
                if fill_background:
                    canvas_height -= y1
                    y_offset = -y1
                else:
                    y1 = 0
            if x2 > _image.width:
                if fill_background:
                    canvas_width += x2 - _image.width
                else:
                    x2 = _image.width
            if y2 > _image.height:
                if fill_background:
                    canvas_height += y2 - _image.height
                else:
                    y2 = _image.height

            if fill_background:
                crop_box = (x1 + x_offset, y1 + y_offset, width + border_reserve*2, height + border_reserve*2)
            else:
                crop_box = (x1, y1, x2 - x1, y2 - y1)
            crop_boxs.append(crop_box)
            if len(crop_boxs) > 0:    # 批量图强制使用同一尺寸
                crop_box = crop_boxs[0]

            orig_width =  crop_box[2]
            orig_height = crop_box[3]
            if aspect_ratio == 'detect_mask':
                ratio = orig_width / orig_height

            # calculate target width and height
            if orig_width > orig_height:
                if scale_to_side == 'longest':
                    target_width = scale_to_length
                    target_height = int(target_width / ratio)
                elif scale_to_side == 'shortest':
                    target_height = scale_to_length
                    target_width = int(target_height * ratio)
                elif scale_to_side == 'width':
                    target_width = scale_to_length
                    target_height = int(target_width / ratio)
                elif scale_to_side == 'height':
                    target_height = scale_to_length
                    target_width = int(target_height * ratio)
                else:
                    target_width = orig_width
                    target_height = int(target_width / ratio)
            else:
                if scale_to_side == 'longest':
                    target_height = scale_to_length
                    target_width = int(target_height * ratio)
                elif scale_to_side == 'shortest':
                    target_width = scale_to_length
                    target_height = int(target_width / ratio)
                elif scale_to_side == 'width':
                    target_width = scale_to_length
                    target_height = int(target_width / ratio)
                elif scale_to_side == 'height':
                    target_height = scale_to_length
                    target_width = int(target_height * ratio)
                else:
                    target_height = orig_height
                    target_width = int(target_height * ratio)

            _canvas = Image.new('RGB', size=(canvas_width, canvas_height), color=background_color)
            _mask_canvas = Image.new('L',  size=(canvas_width, canvas_height), color='black')
            if ultra_detail_range:
                _image = pixel_spread(_image, _mask)
            if fill_background:
                _canvas.paste(_image, box=(x_offset, y_offset), mask=_mask.convert('L'))
            else:
                _canvas.paste(_image, box=(x_offset, y_offset))
            _mask_canvas.paste(_mask, box=(x_offset, y_offset))
            preview_image = Image.new('RGB', size=(canvas_width, canvas_height), color='gray')
            preview_image.paste(_mask, box=(x_offset, y_offset))
            preview_image = draw_rect(preview_image,
                                      crop_box[0], crop_box[1], crop_box[2], crop_box[3],
                                      line_color="#F00000", line_width=(canvas_width + canvas_height)//200)

            ret_image = _canvas.crop((crop_box[0], crop_box[1], crop_box[0]+crop_box[2], crop_box[1]+crop_box[3]))
            ret_image = fit_resize_image(ret_image, target_width, target_height,
                                         fit=fit, resize_sampler=Image.LANCZOS,
                                         background_color=background_color)
            ret_mask = _mask_canvas.crop((crop_box[0], crop_box[1], crop_box[0]+crop_box[2], crop_box[1]+crop_box[3]))
            ret_mask = fit_resize_image(ret_mask, target_width, target_height,
                                         fit=fit, resize_sampler=Image.LANCZOS,
                                         background_color="#000000")
            ret_images.append(pil2tensor(ret_image))
            ret_box_previews.append(pil2tensor(preview_image))
            ret_masks.append(image2mask(ret_mask))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),
                torch.cat(ret_box_previews, dim=0),
                torch.cat(ret_masks, dim=0),
                )
```