
# Documentation
- Class name: APersonMaskGenerator
- Category: A Person Mask Generator - David Bielejeski
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

APersonMaskGenerator节点用于生成图像中人物各个部位的分割遮罩，如头发、面部、身体和衣服。它利用图像分割技术来识别和分离这些区域，创建可用于各种图像编辑和处理任务的遮罩。

# Input types
## Required
- images
    - 需要生成遮罩的输入图像。这些图像是所有分割操作的基础，决定了要分离和遮罩的区域。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
## Optional
- face_mask
    - 指示是否应生成面部遮罩，通过分离面部区域影响分割过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- background_mask
    - 指示是否应生成背景遮罩，通过分离其他指定遮罩未覆盖的区域影响分割过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- hair_mask
    - 指示是否应生成头发遮罩，引导分割过程分离头发区域。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- body_mask
    - 指示是否应生成身体遮罩，引导分割过程分离身体区域。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- clothes_mask
    - 指示是否应生成衣服遮罩，引导分割过程分离衣服区域。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- confidence
    - 指定遮罩生成的置信度阈值，影响分割的精确度和生成的遮罩结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- masks
    - 输出为指定目标的遮罩集合，每个遮罩代表图像中的一个分割区域。这些遮罩可用于进一步的图像编辑或处理任务。
    - Comfy dtype: MASK
    - Python dtype: List[Image]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class APersonMaskGenerator:

    def __init__(self):
        # download the model if we need it
        get_a_person_mask_generator_model_path()

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required":
                {
                    "images": ("IMAGE",),
                },
            "optional":
                {
                    "face_mask": ("BOOLEAN", {"default": True, "label_on": "enabled", "label_off": "disabled"}),
                    "background_mask": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "hair_mask": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "body_mask": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "clothes_mask": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "confidence": ("FLOAT", {"default": 0.40, "min": 0.01, "max": 1.0, "step": 0.01},),
                }
        }

    CATEGORY = "A Person Mask Generator - David Bielejeski"
    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("masks",)

    FUNCTION = "generate_mask"

    def get_mediapipe_image(self, image: Image) -> mp.Image:
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

    def generate_mask(self, images, face_mask: bool, background_mask: bool, hair_mask: bool, body_mask: bool, clothes_mask: bool, confidence: float):

        """Create a segmentation mask from an image

        Args:
            image (torch.Tensor): The image to create the mask for.
            face_mask (bool): create a mask for the background.
            background_mask (bool): create a mask for the hair.
            hair_mask (bool): create a mask for the body .
            body_mask (bool): create a mask for the face.
            clothes_mask (bool): create a mask for the clothes.

        Returns:
            torch.Tensor: The segmentation masks.
        """

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
        res_masks = []
        with mp.tasks.vision.ImageSegmenter.create_from_options(options) as segmenter:
            for image in images:
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

                # https://developers.google.com/mediapipe/solutions/vision/image_segmenter#multiclass-model
                # 0 - background
                # 1 - hair
                # 2 - body - skin
                # 3 - face - skin
                # 4 - clothes
                # 5 - others(accessories)
                masks = []
                if background_mask:
                    masks.append(segmented_masks.confidence_masks[0])
                if hair_mask:
                    masks.append(segmented_masks.confidence_masks[1])
                if body_mask:
                    masks.append(segmented_masks.confidence_masks[2])
                if face_mask:
                    masks.append(segmented_masks.confidence_masks[3])
                if clothes_mask:
                    masks.append(segmented_masks.confidence_masks[4])

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
                tensor_mask = tensor_mask.squeeze(3)[..., 0]

                res_masks.append(tensor_mask)

        return (torch.cat(res_masks, dim=0),)

```
