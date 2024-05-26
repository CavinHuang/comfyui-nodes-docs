# Documentation
- Class name: YoloSegNode
- Category: Jags_vector/yoloSEG
- Output node: False
- Repo Ref: https://github.com/jags111/ComfyUI_Jags_VectorMagic

该节点旨在使用基于YOLO的模型执行语义分割，识别并屏蔽图像中特定类别的实例。它处理输入的图像以识别所需的类别，并输出一个分割后的图像和一个相应的掩码，突出显示已识别的实例。

# Input types
## Required
- image
    - 输入图像对于节点执行分割至关重要。它是模型分析和识别指定类别的主要数据源。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- model_name
    - 此参数决定了用于分割的特定YOLO模型。它至关重要，因为它决定了分割过程的准确性和有效性。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- class_id
    - 类别ID参数允许用户指定图像中应该被分割的类别，影响节点的输出，使其专注于所需的类别。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- SEG_IMAGE
    - 分割后的图像表示输入图像，突出显示识别的类别实例，提供分割过程的视觉输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- SEG_MASK
    - 掩码输出是分割类别实例的二进制表示，作为进一步分析或操作图像中识别类别的精确工具。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class YoloSegNode:

    def __init__(self) -> None:
        ...

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'model_name': (folder_paths.get_filename_list('yolov8'),), 'class_id': ('INT', {'default': 0})}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    RETURN_NAMES = ('SEG_IMAGE', 'SEG_MASK')
    FUNCTION = 'seg'
    CATEGORY = 'Jags_vector/yoloSEG'

    def seg(self, image, model_name, class_id):
        image_tensor = image
        image_np = image_tensor.cpu().numpy()
        image = Image.fromarray((image_np.squeeze(0) * 255).astype(np.uint8))
        print(f"model_path: {os.path.join(folder_paths.models_dir, 'yolov8')}/{model_name}")
        model = YOLO(f"{os.path.join(folder_paths.models_dir, 'yolov8')}/{model_name}")
        results = model(image)
        masks = results[0].masks.data
        boxes = results[0].boxes.data
        clss = boxes[:, 5]
        people_indices = torch.where(clss == class_id)
        people_masks = masks[people_indices]
        people_mask = torch.any(people_masks, dim=0).int() * 255
        im_array = results[0].plot()
        im = Image.fromarray(im_array[..., ::-1])
        image_tensor_out = torch.tensor(np.array(im).astype(np.float32) / 255.0)
        image_tensor_out = torch.unsqueeze(image_tensor_out, 0)
        return (image_tensor_out, people_mask)
```