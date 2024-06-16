# Documentation
- Class name: PersonMaskUltraV2
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

PersonMaskUltra的V2升级版，增加了VITMatte边缘处理方法。(注意:超过2K尺寸的图片使用此方法将占用大量内存)

# Input types

## Required

- images
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- face
    - 面部。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- hair
    - 头发。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- body
    - 身体。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- clothes
    - 衣服。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- accessories
    - 配饰。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- background
    - 背景。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- confidence
    - 置信度。
    - Comfy dtype: FLOAT
    - Python dtype: float

- detail_method
    - 细节处理方法。
    - Comfy dtype: ['VITMatte', 'VITMatte(local)', 'PyMatting', 'GuidedFilter']
    - Python dtype: str

- detail_erode
    - 细节腐蚀。
    - Comfy dtype: INT
    - Python dtype: int

- detail_dilate
    - 细节膨胀。
    - Comfy dtype: INT
    - Python dtype: int

- black_point
    - 黑点。
    - Comfy dtype: FLOAT
    - Python dtype: float

- white_point
    - 白点。
    - Comfy dtype: FLOAT
    - Python dtype: float

- process_detail
    - 处理细节。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class PersonMaskUltraV2:

    def __init__(self):
        # download the model if we need it
        get_a_person_mask_generator_model_path()

    @classmethod
    def INPUT_TYPES(self):

        method_list = ['VITMatte', 'VITMatte(local)', 'PyMatting', 'GuidedFilter', ]

        return {
            "required":
                {
                    "images": ("IMAGE",),
                    "face": ("BOOLEAN", {"default": True, "label_on": "enabled", "label_off": "disabled"}),
                    "hair": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "body": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "clothes": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "accessories": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "background": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "confidence": ("FLOAT", {"default": 0.4, "min": 0.05, "max": 0.95, "step": 0.01},),
                    "detail_method": (method_list,),
                    "detail_erode": ("INT", {"default": 6, "min": 1, "max": 255, "step": 1}),
                    "detail_dilate": ("INT", {"default": 6, "min": 1, "max": 255, "step": 1}),
                    "black_point": ("FLOAT", {"default": 0.01, "min": 0.01, "max": 0.98, "step": 0.01, "display": "slider"}),
                    "white_point": ("FLOAT", {"default": 0.99, "min": 0.02, "max": 0.99, "step": 0.01, "display": "slider"}),
                    "process_detail": ("BOOLEAN", {"default": True}),
                },
            "optional":
                {
                }
        }

    RETURN_TYPES = ("IMAGE", "MASK", )
    RETURN_NAMES = ("image", "mask", )
    FUNCTION = 'person_mask_ultra_v2'
    CATEGORY = '😺dzNodes/LayerMask'

    def get_mediapipe_image(self, image: Image):
        import mediapipe as mp
        # Convert image to NumPy array
        numpy_image = np.asarray(image)
        image_format = mp.ImageFormat.SRGB
        # Convert BGR to RGB (if necessary)
        if numpy_image.shape[-1] == 4:
            image_format = mp.ImageFormat.SRGBA
        elif numpy_image.shape[-1] == 3:
            image_format = mp.ImageFormat.SRGB

            numpy_image = cv2.cvtColor(numpy_image, cv2.COLOR_BGR2RGB)
        return mp.Image(image_format=image_format, data=numpy_image)

    def person_mask_ultra_v2(self, images, face, hair, body, clothes,
                          accessories, background, confidence,
                          detail_method, detail_erode, detail_dilate,
                          black_point, white_point, process_detail):

        import mediapipe as mp
        a_person_mask_generator_model_path = get_a_person_mask_generator_model_path()
        a_person_mask_generator_model_buffer = None
        with open(a_person_mask_generator_model_path, "rb") as f:
            a_person_mask_generator_model_buffer = f.read()
        image_segmenter_base_options = mp.tasks.BaseOptions(model_asset_buffer=a_person_mask_generator_model_buffer)
        options = mp.tasks.vision.ImageSegmenterOptions(
            base_options=image_segmenter_base_options,
            running_mode=mp.tasks.vision.RunningMode.IMAGE,
            output_category_mask=True)
        # Create the image segmenter
        ret_images = []
        ret_masks = []

        if detail_method == 'VITMatte(local)':
            local_files_only = True
        else:
            local_files_only = False

        with mp.tasks.vision.ImageSegmenter.create_from_options(options) as segmenter:
            for image in images:
                _image = torch.unsqueeze(image, 0)
                orig_image = tensor2pil(_image).convert('RGB')
                # Convert the Tensor to a PIL image
                i = 255. * image.cpu().numpy()
                image_pil = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
                # create our foreground and background arrays for storing the mask results
                mask_background_array = np.zeros((image_pil.size[0], image_pil.size[1], 4), dtype=np.uint8)
                mask_background_array[:] = (0, 0, 0, 255)
                mask_foreground_array = np.zeros((image_pil.size[0], image_pil.size[1], 4), dtype=np.uint8)
                mask_foreground_array[:] = (255, 255, 255, 255)
                # Retrieve the masks for the segmented image
                media_pipe_image = self.get_mediapipe_image(image=image_pil)
                segmented_masks = segmenter.segment(media_pipe_image)
                masks = []
                if background:
                    masks.append(segmented_masks.confidence_masks[0])
                if hair:
                    masks.append(segmented_masks.confidence_masks[1])
                if body:
                    masks.append(segmented_masks.confidence_masks[2])
                if face:
                    masks.append(segmented_masks.confidence_masks[3])
                if clothes:
                    masks.append(segmented_masks.confidence_masks[4])
                if accessories:
                    masks.append(segmented_masks.confidence_masks[5])
                image_data = media_pipe_image.numpy_view()
                image_shape = image_data.shape
                # convert the image shape from "rgb" to "rgba" aka add the alpha channel
                if image_shape[-1] == 3:
                    image_shape = (image_shape[0], image_shape[1], 4)
                mask_background_array = np.zeros(image_shape, dtype=np.uint8)
                mask_background_array[:] = (0, 0, 0, 255)
                mask_foreground_array = np.zeros(image_shape, dtype=np.uint8)
                mask_foreground_array[:] = (255, 255, 255, 255)
                mask_arrays = []
                if len(masks) == 0:
                    mask_arrays.append(mask_background_array)
                else:
                    for i, mask in enumerate(masks):
                        condition = np.stack((mask.numpy_view(),) * image_shape[-1], axis=-1) > confidence
                        mask_array = np.where(condition, mask_foreground_array, mask_background_array)
                        mask_arrays.append(mask_array)
                # Merge our masks taking the maximum from each
                merged_mask_arrays = reduce(np.maximum, mask_arrays)
                # Create the image
                mask_image = Image.fromarray(merged_mask_arrays)
                # convert PIL image to tensor image
                tensor_mask = mask_image.convert("RGB")
                tensor_mask = np.array(tensor_mask).astype(np.float32) / 255.0
                tensor_mask = torch.from_numpy(tensor_mask)[None,]
                _mask = tensor_mask.squeeze(3)[..., 0]

                detail_range = detail_erode + detail_dilate
                if process_detail:
                    if detail_method == 'GuidedFilter':
                        _mask = guided_filter_alpha(pil2tensor(orig_image), _mask, detail_range // 6 + 1)
                        _mask = tensor2pil(histogram_remap(_mask, black_point, white_point))
                    elif detail_method == 'PyMatting':
                        _mask = tensor2pil(
                            mask_edge_detail(pil2tensor(orig_image), _mask,
                                             detail_range // 8 + 1, black_point, white_point))
                    else:
                        _trimap = generate_VITMatte_trimap(_mask, detail_erode, detail_dilate)
                        _mask = generate_VITMatte(orig_image, _trimap, local_files_only=local_files_only)
                        _mask = tensor2pil(histogram_remap(pil2tensor(_mask), black_point, white_point))
                else:
                    _mask = mask2image(_mask)

                ret_image = RGB2RGBA(orig_image, _mask)
                ret_images.append(pil2tensor(ret_image))
                ret_masks.append(image2mask(_mask))

            log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
            return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0),)
```