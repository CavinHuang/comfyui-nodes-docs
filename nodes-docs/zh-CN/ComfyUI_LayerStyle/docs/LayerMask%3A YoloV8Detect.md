# Documentation
- Class name: YoloV8Detect
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

使用YoloV8模型检测人脸、手部box区域，或者人物分割。支持输出所选择数量的通道。 请在 [GoogleDrive](https://drive.google.com/drive/folders/1I5TISO2G1ArSkKJu1O9b4Uvj3DVgn5d2) 或者 [百度网盘](https://pan.baidu.com/s/1ImoJrzL1zDgaCqaSzrNEtw?pwd=5xgk) 下载模型文件并放到 ComfyUI/models/yolo 文件夹。


# Input types

## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: list

- yolo_model
    - yolo模型选择。带有seg名字的模型可以输出分割的mask, 否则只能输出box区域的遮罩。
    - Comfy dtype: STRING
    - Python dtype: str

- mask_merge
    - 选择合并的遮罩。all是合并全部遮罩输出。选数值是输出多少个遮罩，按识别置信度排序合并输出。
    - Comfy dtype: STRING
    - Python dtype: str


# Output types

- mask
    - 输出的遮罩。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

- yolo_plot_image
    - yolo识别结果预览图。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- yolo_masks
    - yolo识别出来的所有遮罩，每个单独的遮罩输出为一个mask。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


# Usage tips
- Infra type: GPU

# Source code
```
class YoloV8Detect:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        __file_list = glob.glob(model_path + '/*.pt')
        # __file_list.extend(glob.glob(model_path + '/*.safetensors'))
        FILES_DICT = {}
        for i in range(len(__file_list)):
            _, __filename = os.path.split(__file_list[i])
            FILES_DICT[__filename] = __file_list[i]
        FILE_LIST = list(FILES_DICT.keys())

        mask_merge = ["all", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        return {
            "required": {
                "image": ("IMAGE", ),
                "yolo_model": (FILE_LIST,),
                "mask_merge": (mask_merge,),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("MASK", "IMAGE", "MASK" )
    RETURN_NAMES = ("mask", "yolo_plot_image", "yolo_masks")
    FUNCTION = 'yolo_detect'
    CATEGORY = '😺dzNodes/LayerMask'

    def yolo_detect(self, image,
                          yolo_model, mask_merge
                      ):

        ret_masks = []
        ret_yolo_plot_images = []
        ret_yolo_masks = []

        from  ultralytics import YOLO
        yolo_model = YOLO(os.path.join(model_path, yolo_model))

        for i in image:
            i = torch.unsqueeze(i, 0)
            _image = tensor2pil(i)
            results = yolo_model(_image, retina_masks=True)
            for result in results:
                yolo_plot_image = cv2.cvtColor(result.plot(), cv2.COLOR_BGR2RGB)
                ret_yolo_plot_images.append(pil2tensor(Image.fromarray(yolo_plot_image)))
                # have mask
                if result.masks is not None and len(result.masks) > 0:
                    masks = []
                    masks_data = result.masks.data
                    for index, mask in enumerate(masks_data):
                        _mask = mask.cpu().numpy() * 255
                        _mask = np2pil(_mask).convert("L")
                        ret_yolo_masks.append(image2mask(_mask))
                # no mask, if have box, draw box
                elif result.boxes is not None and len(result.boxes.xyxy) > 0:
                    white_image = Image.new('L', _image.size, "white")
                    for box in result.boxes:
                        x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                        _mask = Image.new('L', _image.size, "black")
                        _mask.paste(white_image.crop((x1, y1, x2, y2)), (x1, y1))
                        ret_yolo_masks.append(image2mask(_mask))
                # no mask and box, add a black mask
                else:
                    ret_yolo_masks.append(torch.zeros((1, _image.size[1], _image.size[0]), dtype=torch.float32))
                    # ret_yolo_masks.append(image2mask(Image.new('L', _image.size, "black")))
                    log(f"{NODE_NAME} mask or box not detected.")

                # merge mask
                _mask = ret_yolo_masks[0]
                if mask_merge == "all":
                    for i in range(len(ret_yolo_masks) - 1):
                        _mask = add_mask(_mask, ret_yolo_masks[i + 1])
                else:
                    for i in range(min(len(ret_yolo_masks), int(mask_merge)) - 1):
                        _mask = add_mask(_mask, ret_yolo_masks[i + 1])
                ret_masks.append(_mask)

        log(f"{NODE_NAME} Processed {len(ret_masks)} image(s).", message_type='finish')
        return (torch.cat(ret_masks, dim=0),
                torch.cat(ret_yolo_plot_images, dim=0),
                torch.cat(ret_yolo_masks, dim=0),)
```