# Documentation
- Class name: WAS_Image_Crop_Face
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Crop_Face 节点旨在智能检测并裁剪图像中的面部。它使用预定义的级联分类器来定位面部，并允许围绕检测到的面部区域进行填充调整。该节点能够处理各种面部检测场景，并返回一个裁剪后的面部图像以及原始图像大小和裁剪坐标。

# Input types
## Required
- image
    - 输入图像，将从中检测并裁剪面部。这是一个强制性参数，因为节点的操作基本上依赖于图像的存在。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- crop_padding_factor
    - 填充因子决定了围绕检测到的面部的填充量。填充因子为0.25意味着将面部大小的25%用作填充。这是可选的，如果没有提供，默认为0.25。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cascade_xml
    - 用于面部检测的级联XML文件。如果使用第一个XML文件未检测到面部，节点将尝试使用多个级联文件。该参数是可选的，如果没有指定，节点将使用默认的级联文件。
    - Comfy dtype: COMBO[lbpcascade_animeface.xml, haarcascade_frontalface_default.xml, haarcascade_frontalface_alt.xml, haarcascade_frontalface_alt2.xml, haarcascade_frontalface_alt_tree.xml, haarcascade_profileface.xml, haarcascade_upperbody.xml]
    - Python dtype: str

# Output types
- cropped_face_image
    - 输出是裁剪后的面部图像，根据需要进行了调整大小和填充，从输入图像中提取。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- crop_data
    - 此输出提供有关面部裁剪的元数据，包括图像中面部的原始大小和裁剪框的坐标。
    - Comfy dtype: COMBO[original_size, (left, top, right, bottom)]
    - Python dtype: Tuple[Tuple[int, int], Tuple[int, int, int, int]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Crop_Face:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'crop_padding_factor': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 2.0, 'step': 0.01}), 'cascade_xml': (['lbpcascade_animeface.xml', 'haarcascade_frontalface_default.xml', 'haarcascade_frontalface_alt.xml', 'haarcascade_frontalface_alt2.xml', 'haarcascade_frontalface_alt_tree.xml', 'haarcascade_profileface.xml', 'haarcascade_upperbody.xml', 'haarcascade_eye.xml'],)}}
    RETURN_TYPES = ('IMAGE', 'CROP_DATA')
    FUNCTION = 'image_crop_face'
    CATEGORY = 'WAS Suite/Image/Process'

    def image_crop_face(self, image, cascade_xml=None, crop_padding_factor=0.25):
        return self.crop_face(tensor2pil(image), cascade_xml, crop_padding_factor)

    def crop_face(self, image, cascade_name=None, padding=0.25):
        import cv2
        img = np.array(image.convert('RGB'))
        face_location = None
        cascades = [os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'lbpcascade_animeface.xml'), os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_frontalface_default.xml'), os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_frontalface_alt.xml'), os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_frontalface_alt2.xml'), os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_frontalface_alt_tree.xml'), os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_profileface.xml'), os.path.join(os.path.join(WAS_SUITE_ROOT, 'res'), 'haarcascade_upperbody.xml')]
        if cascade_name:
            for cascade in cascades:
                if os.path.basename(cascade) == cascade_name:
                    cascades.remove(cascade)
                    cascades.insert(0, cascade)
                    break
        faces = None
        if not face_location:
            for cascade in cascades:
                if not os.path.exists(cascade):
                    cstr(f'Unable to find cascade XML file at `{cascade}`. Did you pull the latest files from https://github.com/WASasquatch/was-node-suite-comfyui repo?').error.print()
                    return (pil2tensor(Image.new('RGB', (512, 512), (0, 0, 0))), False)
                face_cascade = cv2.CascadeClassifier(cascade)
                gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
                if len(faces) != 0:
                    cstr(f'Face found with: {os.path.basename(cascade)}').msg.print()
                    break
            if len(faces) == 0:
                cstr('No faces found in the image!').warning.print()
                return (pil2tensor(Image.new('RGB', (512, 512), (0, 0, 0))), False)
        else:
            cstr('Face found with: face_recognition model').warning.print()
            faces = face_location
        (x, y, w, h) = faces[0]
        left_adjust = max(0, -x)
        right_adjust = max(0, x + w - img.shape[1])
        top_adjust = max(0, -y)
        bottom_adjust = max(0, y + h - img.shape[0])
        if left_adjust < w:
            x += right_adjust
        elif right_adjust < w:
            x -= left_adjust
        if top_adjust < h:
            y += bottom_adjust
        elif bottom_adjust < h:
            y -= top_adjust
        w -= left_adjust + right_adjust
        h -= top_adjust + bottom_adjust
        face_size = min(h, w)
        y_pad = int(face_size * padding)
        x_pad = int(face_size * padding)
        center_x = x + w // 2
        center_y = y + h // 2
        half_size = (face_size + max(x_pad, y_pad)) // 2
        top = max(0, center_y - half_size)
        bottom = min(img.shape[0], center_y + half_size)
        left = max(0, center_x - half_size)
        right = min(img.shape[1], center_x + half_size)
        crop_size = min(right - left, bottom - top)
        left = center_x - crop_size // 2
        right = center_x + crop_size // 2
        top = center_y - crop_size // 2
        bottom = center_y + crop_size // 2
        face_img = img[top:bottom, left:right, :]
        size = max(face_img.copy().shape[:2])
        pad_h = (size - face_img.shape[0]) // 2
        pad_w = (size - face_img.shape[1]) // 2
        face_img = cv2.copyMakeBorder(face_img, pad_h, pad_h, pad_w, pad_w, cv2.BORDER_CONSTANT, value=[0, 0, 0])
        min_size = 64
        if size < min_size:
            size = min_size
        face_img = cv2.resize(face_img, (size, size))
        face_img = Image.fromarray(face_img)
        original_size = face_img.size
        face_img.resize((face_img.size[0] // 64 * 64 + 64, face_img.size[1] // 64 * 64 + 64))
        return (pil2tensor(face_img.convert('RGB')), (original_size, (left, top, right, bottom)))
```