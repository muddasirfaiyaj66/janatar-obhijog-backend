
const LOGO_URL =
  'https://res.cloudinary.com/dcqr7rkm6/image/upload/v1758203448/logoTransparent_wdyzfy.png';

const websiteURL = 'https://janatarobhijog.com';
const escapeHtml = (unsafe: string) =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

// 1. Welcome Email
export const generateWelcomeEmailHTML = ({ name }: { name: string }) => {
  const safeName = escapeHtml(name);
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="bn">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1b5e20,#d32f2f);text-align:center;padding:28px 16px;">
      <img src="${LOGO_URL}" alt="Janatar Obhijog Logo" style="height:120px;margin-bottom:12px;" />
      <h1 style="color:#fff;font-size:22px;font-weight:700;margin:0;">জনতার অভিযোগে স্বাগতম!</h1>
    </div>
    <div style="padding:32px 28px;color:#333;line-height:1.7;">
      <h2 style="font-size:18px;color:#1b5e20;margin:0 0 12px;">প্রিয় ${safeName},</h2>
      <p>আমরা আনন্দিত যে আপনি <b>জনতার অভিযোগ</b> প্ল্যাটফর্মে যোগ দিয়েছেন।<br>আপনার একাউন্ট সফলভাবে তৈরি হয়েছে। এখনই শুরু করুন এবং আমাদের সব ফিচার এক্সপ্লোর করুন।</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${websiteURL}" style="display:inline-block;background:#d32f2f;color:#fff;text-decoration:none;padding:14px 38px;border-radius:8px;font-size:15px;font-weight:600;box-shadow:0 4px 14px rgba(211,47,47,0.25);">ড্যাশবোর্ডে যান</a>
      </div>
      <p style="color:#777;font-size:13px;text-align:center;">যদি আপনার কোনো প্রশ্ন থাকে, এই ইমেইলে রিপ্লাই করুন।<br>আমাদের সাথে থাকার জন্য ধন্যবাদ!</p>
    </div>
    <div style="background:#f4f6fb;text-align:center;padding:16px;color:#555;font-size:13px;">
      &copy; ${year} জনতার অভিযোগ। সর্বস্বত্ব সংরক্ষিত।
    </div>
  </div>
</body>
</html>`;
};

// 2. Complaint Submitted Email
export const generateComplaintSubmittedEmailHTML = ({
  name,
  complaintId,
}: {
  name: string;
  complaintId: string;
}) => {
  const safeName = escapeHtml(name);
  const safeComplaintId = escapeHtml(complaintId);
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="bn">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1b5e20,#d32f2f);text-align:center;padding:28px 16px;">
      <img src="${LOGO_URL}" alt="Janatar Obhijog Logo" style="height:120px;margin-bottom:12px;" />
      <h1 style="color:#fff;font-size:22px;font-weight:700;margin:0;">অভিযোগ গ্রহণ করা হয়েছে</h1>
    </div>
    <div style="padding:32px 28px;color:#333;line-height:1.7;">
      <h2 style="font-size:18px;color:#1b5e20;margin:0 0 12px;">প্রিয় ${safeName},</h2>
      <p>আপনার অভিযোগ সফলভাবে গ্রহণ করা হয়েছে। আমাদের টিম খুব শিগগিরই এটি রিভিউ করবে।</p>
      <p><b>অভিযোগ নম্বর:</b> ${safeComplaintId}</p>
      <p>আপনি চাইলে ড্যাশবোর্ড থেকে অভিযোগের স্ট্যাটাস ট্র্যাক করতে পারবেন।</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${websiteURL}/dashboard" style="display:inline-block;background:#1b5e20;color:#fff;text-decoration:none;padding:14px 38px;border-radius:8px;font-size:15px;font-weight:600;box-shadow:0 4px 14px rgba(27,94,32,0.25);">অভিযোগ ট্র্যাক করুন</a>
      </div>
    </div>
    <div style="background:#f4f6fb;text-align:center;padding:16px;color:#555;font-size:13px;">
      &copy; ${year} জনতার অভিযোগ। সর্বস্বত্ব সংরক্ষিত।
    </div>
  </div>
</body>
</html>`;
};

// 3. Complaint Resolved Email
export const generateComplaintResolvedEmailHTML = ({
  name,
  complaintId,
  websiteURL,
}: {
  name: string;
  complaintId: string;
  websiteURL: string;
}) => {
  const safeName = escapeHtml(name);
  const safeComplaintId = escapeHtml(complaintId);
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="bn">
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1b5e20,#d32f2f);text-align:center;padding:28px 16px;">
      <img src="${LOGO_URL}" alt="Janatar Obhijog Logo" style="height:120px;margin-bottom:12px;" />
      <h1 style="color:#fff;font-size:22px;font-weight:700;margin:0;">আপনার অভিযোগ সমাধান হয়েছে</h1>
    </div>
    <div style="padding:32px 28px;color:#333;line-height:1.7;">
      <h2 style="font-size:18px;color:#1b5e20;margin:0 0 12px;">প্রিয় ${safeName},</h2>
      <p>আমরা আনন্দের সাথে জানাচ্ছি যে আপনার অভিযোগ সফলভাবে সমাধান হয়েছে।</p>
      <p><b>অভিযোগ নম্বর:</b> ${safeComplaintId}</p>
      <p>আপনি চাইলে ড্যাশবোর্ড থেকে বিস্তারিত দেখতে পারবেন।</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${websiteURL}/dashboard" style="display:inline-block;background:#d32f2f;color:#fff;text-decoration:none;padding:14px 38px;border-radius:8px;font-size:15px;font-weight:600;box-shadow:0 4px 14px rgba(211,47,47,0.25);">ড্যাশবোর্ড দেখুন</a>
      </div>
    </div>
    <div style="background:#f4f6fb;text-align:center;padding:16px;color:#555;font-size:13px;">
      &copy; ${year} জনতার অভিযোগ। সর্বস্বত্ব সংরক্ষিত।
    </div>
  </div>
</body>
</html>`;
};
