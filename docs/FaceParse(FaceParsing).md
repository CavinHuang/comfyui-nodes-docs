# Documentation
- Class name: FaceParse
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

FaceParse节点旨在从输入的图像中分析和解析面部特征。它利用预训练的模型来识别和分割面部的各个元素，例如眼睛、鼻子和嘴巴。该节点的主要功能是将输入图像转换为详细的面部解析图，可用于进一步分析或可视化。这一过程增强了对面部结构的理解，对于面部表情识别或面部特征跟踪等应用非常有用。

# Input types
## Required
- model
    - 模型参数对于FaceParse节点至关重要，因为它定义了用于面部解析的预训练神经网络架构。它是节点功能的基础，使得能够识别和分割面部特征。没有模型，节点无法执行其预期任务。
    - Comfy dtype: FACE_PARSING_MODEL
    - Python dtype: torch.nn.Module
- processor
    - 处理器参数对于预处理输入图像以兼容模型的格式至关重要。它确保图像格式正确，并为模型执行面部解析做好了准备。处理器是使模型能够有效处理输入的关键组件。
    - Comfy dtype: FACE_PARSING_PROCESSOR
    - Python dtype: object
- image
    - 图像参数是FaceParse节点的主要输入。它包含需要分析的面部图像。图像的质量和分辨率直接影响面部解析结果的准确性和细节程度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- IMAGE
    - 输出图像是面部解析结果的可视化，不同的面部特征用不同的颜色突出显示。这提供了对面部结构和模型预测准确性的直观理解。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- FACE_PARSING_RESULT
    - 面部解析结果是输入图像的分割表示，其中每个像素都被分配一个对应特定面部特征的标签。这个输出对于进一步分析至关重要，可以用于各种应用，如面部表情分析或面部特征跟踪。
    - Comfy dtype: FACE_PARSING_RESULT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class FaceParse:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('FACE_PARSING_MODEL', {}), 'processor': ('FACE_PARSING_PROCESSOR', {}), 'image': ('IMAGE', {})}}
    RETURN_TYPES = ('IMAGE', 'FACE_PARSING_RESULT')
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, model, processor, image: Tensor):
        images = []
        results = []
        transform = T.ToPILImage()
        colormap = cm.get_cmap('viridis', 19)
        for item in image:
            size = item.shape[:2]
            inputs = processor(images=transform(item.permute(2, 0, 1)), return_tensors='pt')
            outputs = model(**inputs)
            logits = outputs.logits.cpu()
            upsampled_logits = nn.functional.interpolate(logits, size=size, mode='bilinear', align_corners=False)
            pred_seg = upsampled_logits.argmax(dim=1)[0]
            pred_seg_np = pred_seg.detach().numpy().astype(np.uint8)
            results.append(torch.tensor(pred_seg_np))
            colored = colormap(pred_seg_np)
            colored_sliced = colored[:, :, :3]
            images.append(torch.tensor(colored_sliced))
        return (torch.cat(images, dim=0).unsqueeze(0), torch.cat(results, dim=0).unsqueeze(0))
```