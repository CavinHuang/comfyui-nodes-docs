# Documentation
- Class name: YoloSEGdetectionNode
- Category: Jags_vector/yoloSEG
- Output node: False
- Repo Ref: https://github.com/jags111/ComfyUI_Jags_VectorMagic

该节点使用深度学习模型对图像执行语义分割，识别和分类感兴趣的区域。它利用了YOLO（You Only Look Once）架构的力量，该架构以其实时对象检测能力而闻名，用于分割和分类输入图像中的对象。节点的主要目标是通过描绘不同对象的边界，提供对图像内容的详细理解，从而实现更复杂的图像分析任务。

# Input types
## Required
- image
    - 图像参数对节点的运行至关重要，它是主要的输入。它是节点分割能力得以实现的媒介。图像的质量和分辨率对分割结果的准确性和细节程度有重大影响。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or torch.Tensor
- model_name
    - 模型名称参数决定了将用于分割过程的YOLO模型配置。它非常重要，因为不同的模型可以提供不同水平的准确性和性能。模型的选择直接影响分割的质量以及节点正确识别和分类图像中对象的能力。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- SEG_IMAGE
    - 输出图像，现在已经分割，提供了节点执行的对象分类的视觉表示。这是一个关键的结果，因为它展示了节点在理解和处理输入图像方面的有效性，允许进行进一步的分析和应用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class YoloSEGdetectionNode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'model_name': (folder_paths.get_filename_list('yolov8'),)}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('SEG_IMAGE',)
    FUNCTION = 'detect'
    CATEGORY = 'Jags_vector/yoloSEG'

    def detect(self, image, model_name):
        image_tensor = image
        image_np = image_tensor.cpu().numpy()
        image = Image.fromarray((image_np.squeeze(0) * 255).astype(np.uint8))
        print(f"model_path: {os.path.join(folder_paths.models_dir, 'yolov8')}/{model_name}")
        model = YOLO(f"{os.path.join(folder_paths.models_dir, 'yolov8')}/{model_name}")
        results = model(image)
        im_array = results[0].plot()
        im = Image.fromarray(im_array[..., ::-1])
        image_tensor_out = torch.tensor(np.array(im).astype(np.float32) / 255.0)
        image_tensor_out = torch.unsqueeze(image_tensor_out, 0)
        return (image_tensor_out,)
```