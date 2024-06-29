# Documentation
- Class name: IPAdapterWeightsFromStrategy
- Category: ipadapter/weights
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

该节点的主要功能是基于预定义的策略生成 IP 适配器的权重。
这些权重可以在图像处理的不同阶段应用，以实现特定的效果或优化处理流程

# Input types

## Required

- weights_strategy
    - 权重策略，用于指定生成图像的权重策略。这个参数可以用来控制生成图像的权重策略，以获得更好的效果。
    - Comfy dtype: WEIGHTS_STRATEGY
    - Python dtype: str

## Optional

- image
  - 图像，用于指定生成图像的图像。这个参数可以用来控制生成图像的图像，以获得更好的效果。
  - Comfy dtype: IMAGE
  - Python dtype: torch.Tensor

# Output types
- weights
  - weights输出代表了将指定方法应用于输入权重的结果。它包含了节点目的的精髓，提供了输入数据的合成形式，可以用于进一步的分析或模型训练。
  - Comfy dtype: FLOAT
  - Python dtype: float

- weights_invert
  - 权重反转，用于指定生成图像的权重反转。这个参数可以用来控制生成图像的权重反转，以获得更好的效果。
  - Comfy dtype: FLOAT
  - Python dtype: float

- total_frames
  - 总帧数，用于指定生成图像的总帧数。这个参数可以用来控制生成图像的总帧数，以获得更好的效果。
  - Comfy dtype: INT
  - Python dtype: int

- image1
  - 图像1
  - Comfy dtype: IMAGE
  - Python dtype: torch.Tensor

- image2
  - 图像2
  - Comfy dtype: IMAGE
  - Python dtype: torch.Tensor

- weight_strategy
  - 权重策略
  - Comfy dtype: WEIGHTS_STRATEGY
  - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterWeightsFromStrategy(IPAdapterWeights):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "weights_strategy": ("WEIGHTS_STRATEGY",),
            }, "optional": {
                "image": ("IMAGE",),
            }
        }
```