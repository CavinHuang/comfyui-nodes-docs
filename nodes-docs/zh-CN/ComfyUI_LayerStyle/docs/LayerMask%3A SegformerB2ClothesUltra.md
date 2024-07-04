# Documentation
- Class name: Segformer_B2_Clothes
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

为人物生成脸、头发、手臂、腿以及服饰的遮罩，主要用于分割服装。模型分割代码来自StartHua，感谢原作者。 与comfyui_segformer_b2_clothes节点相比，这个节点具有超高的边缘细节。(注意:生成边缘超过2K尺寸的图片使用VITMatte方法将占用大量内存)

*从https://huggingface.co/mattmdjaga/segformer_b2_clothes下载全部文件至ComfyUI/models/segformer_b2_clothes文件夹。

# Input types

## Required

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- face
    - 脸。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- hair
    - 头发。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- hat
    - 帽子。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- sunglass
    - 太阳镜。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- left_arm
    - 左臂。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- right_arm
    - 右臂。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- left_leg
    - 左腿。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- right_leg
    - 右腿。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- upper_clothes
    - 上衣。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- skirt
    - 裙子。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- pants
    - 裤子。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- dress
    - 连衣裙。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- belt
    - 腰带。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- shoe
    - 鞋子。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- bag
    - 包。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- scarf
    - 围巾。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

- detail_method
    - 边缘处理方法。提供了VITMatte, VITMatte(local), PyMatting, GuidedFilter。如果首次使用VITMatte后模型已经下载，之后可以使用VITMatte(local)。
    - Comfy dtype: ['VITMatte', 'VITMatte(local)', 'PyMatting', 'GuidedFilter']
    - Python dtype: str

- detail_erode
    - 遮罩边缘向内侵蚀范围。数值越大，向内修复的范围越大。
    - Comfy dtype: INT
    - Python dtype: int

- detail_dilate
    - 遮罩边缘向外扩张范围。数值越大，向外修复的范围越大
    - Comfy dtype: INT
    - Python dtype: int

- black_point
    - 边缘黑色采样阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- white_point
    - 边缘白色采样阈值。
    - Comfy dtype: FLOAT
    - Python dtype: float

- process_detail
    - 此处设为False将跳过边缘处理以节省运行时间。
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
class Segformer_B2_Clothes:

    def __init__(self):
        pass

    # Labels: 0: "Background", 1: "Hat", 2: "Hair", 3: "Sunglasses", 4: "Upper-clothes", 5: "Skirt",
    # 6: "Pants", 7: "Dress", 8: "Belt", 9: "Left-shoe", 10: "Right-shoe", 11: "Face",
    # 12: "Left-leg", 13: "Right-leg", 14: "Left-arm", 15: "Right-arm", 16: "Bag", 17: "Scarf"

    @classmethod
    def INPUT_TYPES(cls):
        method_list = ['VITMatte', 'VITMatte(local)', 'PyMatting', 'GuidedFilter', ]
        return {"required":
                {
                "image":("IMAGE",),
                "face": ("BOOLEAN", {"default": False}),
                "hair": ("BOOLEAN", {"default": False}),
                "hat": ("BOOLEAN", {"default": False}),
                "sunglass": ("BOOLEAN", {"default": False}),
                "left_arm": ("BOOLEAN", {"default": False}),
                "right_arm": ("BOOLEAN", {"default": False}),
                "left_leg": ("BOOLEAN", {"default": False}),
                "right_leg": ("BOOLEAN", {"default": False}),
                "upper_clothes": ("BOOLEAN", {"default": False}),
                "skirt": ("BOOLEAN", {"default": False}),
                "pants": ("BOOLEAN", {"default": False}),
                "dress": ("BOOLEAN", {"default": False}),
                "belt": ("BOOLEAN", {"default": False}),
                "shoe": ("BOOLEAN", {"default": False}),
                "bag": ("BOOLEAN", {"default": False}),
                "scarf": ("BOOLEAN", {"default": False}),
                "detail_method": (method_list,),
                "detail_erode": ("INT", {"default": 12, "min": 1, "max": 255, "step": 1}),
                "detail_dilate": ("INT", {"default": 6, "min": 1, "max": 255, "step": 1}),
                "black_point": ("FLOAT", {"default": 0.01, "min": 0.01, "max": 0.98, "step": 0.01, "display": "slider"}),
                "white_point": ("FLOAT", {"default": 0.99, "min": 0.02, "max": 0.99, "step": 0.01, "display": "slider"}),
                "process_detail": ("BOOLEAN", {"default": True}),
                }
        }

    RETURN_TYPES = ("IMAGE", "MASK", )
    RETURN_NAMES = ("image", "mask", )
    FUNCTION = "segformer_ultra"
    CATEGORY = '😺dzNodes/LayerMask'

    def segformer_ultra(self, image,
                        face, hat, hair, sunglass, upper_clothes, skirt, pants, dress, belt, shoe,
                        left_leg, right_leg, left_arm, right_arm, bag, scarf, detail_method,
                        detail_erode, detail_dilate, black_point, white_point, process_detail
                        ):

        ret_images = []
        ret_masks = []

        if detail_method == 'VITMatte(local)':
            local_files_only = True
        else:
            local_files_only = False

        for i in image:
            pred_seg, cloth = get_segmentation(i)
            i = torch.unsqueeze(i, 0)
            i = pil2tensor(tensor2pil(i).convert('RGB'))
            orig_image = tensor2pil(i).convert('RGB')

            labels_to_keep = [0]
            if not hat:
                labels_to_keep.append(1)
            if not hair:
                labels_to_keep.append(2)
            if not sunglass:
                labels_to_keep.append(3)
            if not upper_clothes:
                labels_to_keep.append(4)
            if not skirt:
                labels_to_keep.append(5)
            if not pants:
                labels_to_keep.append(6)
            if not dress:
                labels_to_keep.append(7)
            if not belt:
                labels_to_keep.append(8)
            if not shoe:
                labels_to_keep.append(9)
                labels_to_keep.append(10)
            if not face:
                labels_to_keep.append(11)
            if not left_leg:
                labels_to_keep.append(12)
            if not right_leg:
                labels_to_keep.append(13)
            if not left_arm:
                labels_to_keep.append(14)
            if not right_arm:
                labels_to_keep.append(15)
            if not bag:
                labels_to_keep.append(16)
            if not scarf:
                labels_to_keep.append(17)

            mask = np.isin(pred_seg, labels_to_keep).astype(np.uint8)

            # 创建agnostic-mask图像
            mask_image = Image.fromarray((1 - mask) * 255)
            mask_image = mask_image.convert("L")
            _mask = pil2tensor(mask_image)

            detail_range = detail_erode + detail_dilate
            if process_detail:
                if detail_method == 'GuidedFilter':
                    _mask = guided_filter_alpha(i, _mask, detail_range // 6 + 1)
                    _mask = tensor2pil(histogram_remap(_mask, black_point, white_point))
                elif detail_method == 'PyMatting':
                    _mask = tensor2pil(mask_edge_detail(i, _mask, detail_range // 8 + 1, black_point, white_point))
                else:
                    _trimap = generate_VITMatte_trimap(_mask, detail_erode, detail_dilate)
                    _mask = generate_VITMatte(orig_image, _trimap, local_files_only=local_files_only)
                    _mask = tensor2pil(histogram_remap(pil2tensor(_mask), black_point, white_point))
            else:
                _mask = mask2image(_mask)

            ret_image = RGB2RGBA(orig_image, _mask.convert('L'))
            ret_images.append(pil2tensor(ret_image))
            ret_masks.append(image2mask(_mask))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0), torch.cat(ret_masks, dim=0),)
```