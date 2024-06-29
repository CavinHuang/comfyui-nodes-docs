# Documentation
- Class name: BatchCropFromMaskAdvanced
- Category: KJNodes/masking
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

BatchCropFromMaskAdvanced 节点的 'crop' 方法旨在根据提供的掩码智能裁剪图像。它计算每个掩码的边界框，平滑边界框大小和中心，然后将图像和掩码裁剪到统一大小，同时保持掩码区域的完整性。当需要为进一步处理准备图像且需要一致的图像尺寸时，此节点特别有用。

# Input types
## Required
- original_images
    - original_images 参数是包含将由节点处理的原始图像数据的关键输入。它对节点的执行至关重要，因为它直接影响裁剪操作和最终输出图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- masks
    - masks 参数定义了在裁剪过程中需要保留的图像中的兴趣区域。它在确保裁剪时不会丢失图像的重要部分中起着至关重要的作用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
## Optional
- crop_size_mult
    - crop_size_mult 参数用于调整裁剪图像的大小。这是一个可选输入，允许用户控制最终裁剪大小与原始图像尺寸的比例。
    - Comfy dtype: FLOAT
    - Python dtype: float
- bbox_smooth_alpha
    - bbox_smooth_alpha 参数负责控制连续图像之间边界框大小的平滑度。它提供了一种保持不同裁剪之间一致大小的方法，这对于某些类型的图像分析可能很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- original_images
    - original_images 输出包含作为输入提供给节点的原始图像数据。它作为用户参考，用于比较裁剪操作前后的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- cropped_images
    - cropped_images 输出由根据掩码和指定参数裁剪的图像组成。这些是节点操作的主要结果，已准备好进行进一步的处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- cropped_masks
    - cropped_masks 输出包括与裁剪后的图像相对应的掩码。它确保掩码识别的兴趣区域保留在最终输出中。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- combined_crop_image
    - combined_crop_image 输出是所有输入裁剪图像的组合。它可以用于可视化目的，快速评估不同图像裁剪的一致性和质量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- combined_crop_masks
    - combined_crop_masks 输出代表所有裁剪图像的组合掩码。对于需要对掩码区域进行进一步分析的应用，此输出可能很有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- bboxes
    - bboxes 输出为每个单独裁剪图像提供边界框坐标。对于需要精确定位图像内区域的应用，这些信息可能很重要。
    - Comfy dtype: BBOX
    - Python dtype: List[Tuple[int, int, int, int]]
- combined_bounding_box
    - combined_bounding_box 输出提供了组合裁剪图像的边界框。当需要一个单一的边界框来封装所有裁剪区域以进行进一步处理或分析时，它很有用。
    - Comfy dtype: BBOX
    - Python dtype: List[Tuple[int, int, int, int]]
- bbox_width
    - bbox_width 输出表示组合裁剪图像的边界框宽度。它是裁剪区域水平范围的度量，可用于尺寸计算。
    - Comfy dtype: INT
    - Python dtype: int
- bbox_height
    - bbox_height 输出表示组合裁剪图像的边界框高度。它是裁剪区域垂直范围的度量，可用于尺寸计算。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: GPU

# Source code
```
class BatchCropFromMaskAdvanced:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'original_images': ('IMAGE',), 'masks': ('MASK',), 'crop_size_mult': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'bbox_smooth_alpha': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE', 'IMAGE', 'MASK', 'IMAGE', 'MASK', 'BBOX', 'BBOX', 'INT', 'INT')
    RETURN_NAMES = ('original_images', 'cropped_images', 'cropped_masks', 'combined_crop_image', 'combined_crop_masks', 'bboxes', 'combined_bounding_box', 'bbox_width', 'bbox_height')
    FUNCTION = 'crop'
    CATEGORY = 'KJNodes/masking'

    def smooth_bbox_size(self, prev_bbox_size, curr_bbox_size, alpha):
        return round(alpha * curr_bbox_size + (1 - alpha) * prev_bbox_size)

    def smooth_center(self, prev_center, curr_center, alpha=0.5):
        return (round(alpha * curr_center[0] + (1 - alpha) * prev_center[0]), round(alpha * curr_center[1] + (1 - alpha) * prev_center[1]))

    def crop(self, masks, original_images, crop_size_mult, bbox_smooth_alpha):
        bounding_boxes = []
        combined_bounding_box = []
        cropped_images = []
        cropped_masks = []
        cropped_masks_out = []
        combined_crop_out = []
        combined_cropped_images = []
        combined_cropped_masks = []

        def calculate_bbox(mask):
            non_zero_indices = np.nonzero(np.array(mask))
            (min_x, max_x, min_y, max_y) = (0, 0, 0, 0)
            if len(non_zero_indices[1]) > 0 and len(non_zero_indices[0]) > 0:
                (min_x, max_x) = (np.min(non_zero_indices[1]), np.max(non_zero_indices[1]))
                (min_y, max_y) = (np.min(non_zero_indices[0]), np.max(non_zero_indices[0]))
            width = max_x - min_x
            height = max_y - min_y
            bbox_size = max(width, height)
            return (min_x, max_x, min_y, max_y, bbox_size)
        combined_mask = torch.max(masks, dim=0)[0]
        _mask = tensor2pil(combined_mask)[0]
        (new_min_x, new_max_x, new_min_y, new_max_y, combined_bbox_size) = calculate_bbox(_mask)
        center_x = (new_min_x + new_max_x) / 2
        center_y = (new_min_y + new_max_y) / 2
        half_box_size = round(combined_bbox_size // 2)
        new_min_x = max(0, round(center_x - half_box_size))
        new_max_x = min(original_images[0].shape[1], round(center_x + half_box_size))
        new_min_y = max(0, round(center_y - half_box_size))
        new_max_y = min(original_images[0].shape[0], round(center_y + half_box_size))
        combined_bounding_box.append((new_min_x, new_min_y, new_max_x - new_min_x, new_max_y - new_min_y))
        self.max_bbox_size = 0
        curr_max_bbox_size = max((calculate_bbox(tensor2pil(mask)[0])[-1] for mask in masks))
        self.max_bbox_size = self.smooth_bbox_size(self.max_bbox_size, curr_max_bbox_size, bbox_smooth_alpha)
        self.max_bbox_size = round(self.max_bbox_size * crop_size_mult)
        self.max_bbox_size = math.ceil(self.max_bbox_size / 16) * 16
        if self.max_bbox_size > original_images[0].shape[0] or self.max_bbox_size > original_images[0].shape[1]:
            self.max_bbox_size = math.floor(min(original_images[0].shape[0], original_images[0].shape[1]) / 2) * 2
        for (i, (mask, img)) in enumerate(zip(masks, original_images)):
            _mask = tensor2pil(mask)[0]
            non_zero_indices = np.nonzero(np.array(_mask))
            if len(non_zero_indices[0]) > 0 and len(non_zero_indices[1]) > 0:
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
                half_box_size = self.max_bbox_size // 2
                min_x = max(0, center[0] - half_box_size)
                max_x = min(img.shape[1], center[0] + half_box_size)
                min_y = max(0, center[1] - half_box_size)
                max_y = min(img.shape[0], center[1] + half_box_size)
                bounding_boxes.append((min_x, min_y, max_x - min_x, max_y - min_y))
                cropped_img = img[min_y:max_y, min_x:max_x, :]
                cropped_mask = mask[min_y:max_y, min_x:max_x]
                new_size = max(cropped_img.shape[0], cropped_img.shape[1])
                resize_transform = Resize(new_size, interpolation=InterpolationMode.NEAREST, max_size=max(img.shape[0], img.shape[1]))
                resized_mask = resize_transform(cropped_mask.unsqueeze(0).unsqueeze(0)).squeeze(0).squeeze(0)
                resized_img = resize_transform(cropped_img.permute(2, 0, 1))
                crop_transform = CenterCrop((min(self.max_bbox_size, resized_img.shape[1]), min(self.max_bbox_size, resized_img.shape[2])))
                cropped_resized_img = crop_transform(resized_img)
                cropped_images.append(cropped_resized_img.permute(1, 2, 0))
                cropped_resized_mask = crop_transform(resized_mask)
                cropped_masks.append(cropped_resized_mask)
                combined_cropped_img = original_images[i][new_min_y:new_max_y, new_min_x:new_max_x, :]
                combined_cropped_images.append(combined_cropped_img)
                combined_cropped_mask = masks[i][new_min_y:new_max_y, new_min_x:new_max_x]
                combined_cropped_masks.append(combined_cropped_mask)
            else:
                bounding_boxes.append((0, 0, img.shape[1], img.shape[0]))
                cropped_images.append(img)
                cropped_masks.append(mask)
                combined_cropped_images.append(img)
                combined_cropped_masks.append(mask)
        cropped_out = torch.stack(cropped_images, dim=0)
        combined_crop_out = torch.stack(combined_cropped_images, dim=0)
        cropped_masks_out = torch.stack(cropped_masks, dim=0)
        combined_crop_mask_out = torch.stack(combined_cropped_masks, dim=0)
        return (original_images, cropped_out, cropped_masks_out, combined_crop_out, combined_crop_mask_out, bounding_boxes, combined_bounding_box, self.max_bbox_size, self.max_bbox_size)
```