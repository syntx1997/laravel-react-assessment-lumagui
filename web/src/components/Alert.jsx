import { connect } from "react-redux";
import PropTypes from "prop-types";

const Alert = ({ alerts }) => {
  return (
    <>
      {alerts.map((alert) => (
        <div key={alert.id} style={{ marginBottom: 20 }}>
          {alert.type === "info" && <InfoAlert alert={alert} />}
          {alert.type === "success" && <SuccessAlert alert={alert} />}
          {alert.type === "danger" && <DangerAlert alert={alert} />}
        </div>
      ))}
    </>
  );
};

const InfoAlert = ({ alert }) => {
  return (
    <div className="w-full rounded-md border-l-4 border-blue-500 bg-blue-100 p-5">
      <div className="flex space-x-3">
        <div className="flex-1 text-sm leading-tight text-blue-700">
          {alert.msg}
        </div>
      </div>
    </div>
  );
};

const SuccessAlert = ({ alert }) => {
  return (
    <div className="w-full rounded-md bg-green-100 p-5">
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <div className="flex-1 text-sm font-medium leading-tight text-green-700">
            {alert.msg}
          </div>
        </div>
      </div>
    </div>
  );
};

const DangerAlert = ({ alert }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full rounded-md bg-red-100 p-5">
      <div className="flex space-x-3">
        <div className="flex flex-col space-y-2 leading-tight">
          <div className="text-sm font-medium text-red-700">{alert.msg}</div>
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alertReducer,
});

export default connect(mapStateToProps)(Alert);
