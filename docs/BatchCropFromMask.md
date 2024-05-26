# Documentation
- Class name: BatchCropFromMask
- Category: KJNodes/masking
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

BatchCropFromMask节点旨在处理一批图像及其对应的掩码，以产生裁剪后的图像。它根据掩码识别图像中的兴趣区域，并应用裁剪操作以专注于这些区域。该节点还平滑了边界框的大小和中心，以增强批量中不同图像裁剪过程的一致性。

# Input types
## Required
- original_images
    - original_images参数至关重要，因为它代表了将由节点处理的图像批次。该节点将使用这些图像与提供的掩码结合，以确定要裁剪的区域。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- masks
    - masks参数定义了对应于原始图像中兴趣区域的二进制掩码。这些掩码对于节点识别裁剪后应保留图像的哪些部分至关重要。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]
## Optional
- crop_size_mult
    - crop_size_mult参数允许通过将此因子与边界框尺寸相乘来调整裁剪区域的大小。它在控制裁剪操作的范围方面提供了灵活性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_smooth_alpha
    - bbox_smooth_alpha参数控制批次中连续图像之间边界框大小的平滑度。它有助于保持一致的裁剪大小，这对于批量处理非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- original_images
    - original_images输出包含输入到节点的原始图像批次，未改变且以其原始形式存在。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- cropped_images
    - cropped_images输出提供了根据相应掩码识别的区域进行裁剪的图像批次。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- bboxes
    - bboxes输出包括用于确定批次中每张图像裁剪区域的边界框。
    - Comfy dtype: BBOX
    - Python dtype: List[Tuple[int, int, int, int]]
- width
    - width输出表示平滑和乘法处理后的边界框宽度，指示裁剪区域的水平范围。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height输出对应于平滑和乘法处理后的边界框高度，指示裁剪区域的垂直范围。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class BatchCropFromMask:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'original_images': ('IMAGE',), 'masks': ('MASK',), 'crop_size_mult': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'bbox_smooth_alpha': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'BBOX', 'INT', 'INT')
    RETURN_NAMES = ('original_images', 'cropped_images', 'bboxes', 'width', 'height')
    FUNCTION = 'crop'
    CATEGORY = 'KJNodes/masking'

    def smooth_bbox_size(self, prev_bbox_size, curr_bbox_size, alpha):
        if alpha == 0:
            return prev_bbox_size
        return round(alpha * curr_bbox_size + (1 - alpha) * prev_bbox_size)

    def smooth_center(self, prev_center, curr_center, alpha=0.5):
        if alpha == 0:
            return prev_center
        return (round(alpha * curr_center[0] + (1 - alpha) * prev_center[0]), round(alpha * curr_center[1] + (1 - alpha) * prev_center[1]))

    def crop(self, masks, original_images, crop_size_mult, bbox_smooth_alpha):
        bounding_boxes = []
        cropped_images = []
        self.max_bbox_width = 0
        self.max_bbox_height = 0
        curr_max_bbox_width = 0
        curr_max_bbox_height = 0
        for mask in masks:
            _mask = tensor2pil(mask)[0]
            non_zero_indices = np.nonzero(np.array(_mask))
            (min_x, max_x) = (np.min(non_zero_indices[1]), np.max(non_zero_indices[1]))
            (min_y, max_y) = (np.min(non_zero_indices[0]), np.max(non_zero_indices[0]))
            width = max_x - min_x
            height = max_y - min_y
            curr_max_bbox_width = max(curr_max_bbox_width, width)
            curr_max_bbox_height = max(curr_max_bbox_height, height)
        self.max_bbox_width = self.smooth_bbox_size(self.max_bbox_width, curr_max_bbox_width, bbox_smooth_alpha)
        self.max_bbox_height = self.smooth_bbox_size(self.max_bbox_height, curr_max_bbox_height, bbox_smooth_alpha)
        self.max_bbox_width = round(self.max_bbox_width * crop_size_mult)
        self.max_bbox_height = round(self.max_bbox_height * crop_size_mult)
        bbox_aspect_ratio = self.max_bbox_width / self.max_bbox_height
        for (i, (mask, img)) in enumerate(zip(masks, original_images)):
            _mask = tensor2pil(mask)[0]
            non_zero_indices = np.nonzero(np.array(_mask))
            (min_x, max_x) = (np.min(non_zero_indices[1]), np.max(non_zero_indices[1]))
            (min_y, max_y) = (np.min(non_zero_indices[0]), np.max(non_zero_indices[0]))
            center_x = np.mean(non_zero_indices[1])
            center_y = np.mean(non_zero_indices[0])
            curr_center = (round(center_x), round(center_y))
            if not hasattr(self, 'prev_center'):
                self.prev_center = curr_center
            if i > 0:
                center = self.smooth_center(self.prev_center, curr_center, bbox_smooth_alpha)
            else:
                center = curr_center
            self.prev_center = center
            half_box_width = round(self.max_bbox_width / 2)
            half_box_height = round(self.max_bbox_height / 2)
            min_x = max(0, center[0] - half_box_width)
            max_x = min(img.shape[1], center[0] + half_box_width)
            min_y = max(0, center[1] - half_box_height)
            max_y = min(img.shape[0], center[1] + half_box_height)
            bounding_boxes.append((min_x, min_y, max_x - min_x, max_y - min_y))
            cropped_img = img[min_y:max_y, min_x:max_x, :]
            new_height = min(cropped_img.shape[0], self.max_bbox_height)
            new_width = round(new_height * bbox_aspect_ratio)
            resize_transform = Resize((new_height, new_width))
            resized_img = resize_transform(cropped_img.permute(2, 0, 1))
            crop_transform = CenterCrop((self.max_bbox_height, self.max_bbox_width))
            cropped_resized_img = crop_transform(resized_img)
            cropped_images.append(cropped_resized_img.permute(1, 2, 0))
        cropped_out = torch.stack(cropped_images, dim=0)
        return (original_images, cropped_out, bounding_boxes, self.max_bbox_width, self.max_bbox_height)
```